import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // If this is an /app* path hitting the landing page server,
    // hard-redirect to the canonical app URL (absolute, not relative -
    // relative /app/ would just loop back to this same server).
    if (location.pathname.startsWith("/app")) {
      // In local dev the main app runs at 5173; in production it's codnite.com/app/
      const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      const appOrigin = isLocal
        ? `http://localhost:5173` // main app Vite dev server
        : `https://codnite.com`;  // production canonical domain

      // Strip /app prefix from the path so the main app gets a clean sub-path
      const subPath = location.pathname.replace(/^\/app\/?/, "") || "";
      const target = `${appOrigin}/app/${subPath}${location.search}${location.hash}`;
      window.location.replace(target);
      return;
    }

    // Genuine 404 - log it
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  // Don't render the 404 UI while the /app redirect is in-flight
  if (location.pathname.startsWith("/app")) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
        <a href="/" className="text-blue-500 underline hover:text-blue-700">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
