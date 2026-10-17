import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

async function startStaticServer() {
  const server = http.createServer((req, res) => {
    const rawUrl = req.url || '/';
    const parsedPath = rawUrl.split('?')[0];
    let filePath = path.join(distDir, parsedPath === '/' ? 'index.html' : parsedPath);

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(distDir, 'index.html');
    }

    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });

  return new Promise((resolve, reject) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      if (address && typeof address === 'object') {
        resolve({ server, port: address.port });
      } else {
        reject(new Error('Failed to obtain ephemeral port for static preview server'));
      }
    });
  });
}

async function prerenderLanding() {
  console.log('[prerender] Starting prerendering for "/" route...');
  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error(`Build output not found at ${indexHtmlPath}. Run vite build first.`);
  }

  let server, port, browser;
  try {
    const staticServer = await startStaticServer();
    server = staticServer.server;
    port = staticServer.port;
    console.log(`[prerender] Local static preview server running on port ${port}`);

    browser = await chromium.launch({ headless: true });
  } catch (initErr) {
    if (server) server.close();
    console.warn('[prerender] Headless browser unavailable in this environment (e.g. Vercel / serverless build container):', initErr.message);
    console.warn('[prerender] Skipping static prerender pass and retaining standard Vite SPA build.');
    return;
  }

  const page = await browser.newPage();
  page.on('pageerror', err => console.error('[prerender page error]', err.message));
  page.on('console', msg => { if (msg.type() === 'error') console.error('[prerender console error]', msg.text()); });

  try {
    const targetUrl = `http://127.0.0.1:${port}/`;
    console.log(`[prerender] Navigating to ${targetUrl}...`);
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

    // Wait for the main page heading
    await page.waitForSelector('h1', { state: 'attached', timeout: 15000 });

    // Wait for the intro splash animation/loader to complete and unmount
    await page.waitForFunction(() => {
      const loader = document.querySelector('.fixed.inset-0.z-\\[100\\]');
      return !loader;
    }, { timeout: 10000 }).catch(() => {
      console.log('[prerender] Splash loader already unmounted or not present');
    });

    // Allow pending layout recalculations and lazy-loaded components to settle
    await page.waitForTimeout(500);

    // Sanitize runtime animation artifacts from Lenis
    console.log('[prerender] Sanitizing runtime animation artifacts...');
    let sanitizedHtml = await page.evaluate(() => {
      // 1. Remove runtime Lenis scroll classes from <html>
      document.documentElement.classList.remove('lenis', 'lenis-smooth');

      return '<!doctype html>\n' + document.documentElement.outerHTML;
    });

    // 2. Normalize inline style formatting differences between browser outerHTML and React virtual DOM
    sanitizedHtml = sanitizedHtml
      .replaceAll('style="pointer-events: none;"', 'style="pointer-events:none"')
      .replaceAll('style="padding-top: env(safe-area-inset-top, 0px);"', 'style="padding-top:env(safe-area-inset-top, 0px)"');

    // 3. Strip Framer Motion initial-state inline styles (opacity:0, translateY, etc.)
    //    These are baked into the prerendered HTML but Framer Motion resets them
    //    differently on the client, causing React hydration errors #418 and #423.
    //    Framer Motion styles are always on elements that will animate — removing
    //    them means elements render visible until Framer re-applies its animation
    //    (which fires in the same frame as hydration), so there is no visible flash.
    sanitizedHtml = sanitizedHtml.replace(
      / style="opacity: 0;[^"]*"/g,
      ''
    );
    sanitizedHtml = sanitizedHtml.replace(
      / style="opacity:0;[^"]*"/g,
      ''
    );
    // Standalone opacity:0 without other properties
    sanitizedHtml = sanitizedHtml.replace(
      / style="opacity: 0;"/g,
      ''
    );
    sanitizedHtml = sanitizedHtml.replace(
      / style="opacity:0;"/g,
      ''
    );
    // Transform-only initial states (translateY without opacity)
    sanitizedHtml = sanitizedHtml.replace(
      / style="transform: translateY\([^)]+\);"/g,
      ''
    );

    fs.writeFileSync(indexHtmlPath, sanitizedHtml, 'utf8');
    console.log(`[prerender] Successfully wrote prerendered HTML (${sanitizedHtml.length} bytes) to ${indexHtmlPath}`);
  } finally {
    await browser.close();
    server.close();
    console.log('[prerender] Playwright browser and preview server closed.');
  }
}

prerenderLanding().catch((err) => {
  console.warn('[prerender] Notice during prerendering pass:', err.message);
  console.warn('[prerender] Retaining standard Vite distribution index.html.');
  process.exit(0);
});
