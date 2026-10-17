import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root")!;

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <App />, {
    onRecoverableError(error, errorInfo) {
      console.error('HYDRATION_ERROR_DETAIL:', error, errorInfo?.componentStack);
    },
  });
} else {
  createRoot(rootElement).render(<App />);
}

