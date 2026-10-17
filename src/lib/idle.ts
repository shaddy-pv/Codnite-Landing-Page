/**
 * Defers execution of non-critical callbacks until the browser is idle.
 * Falls back to setTimeout for browsers without requestIdleCallback (e.g. Safari).
 * Returns a cancel function for clean teardown in React useEffect hooks.
 */
export function runWhenIdle(callback: () => void, timeout = 1200): () => void {
  if (typeof window === 'undefined') return () => {};

  if ('requestIdleCallback' in window) {
    const handle = (window as any).requestIdleCallback(callback, { timeout });
    return () => (window as any).cancelIdleCallback(handle);
  } else {
    const handle = setTimeout(callback, 250);
    return () => clearTimeout(handle);
  }
}
