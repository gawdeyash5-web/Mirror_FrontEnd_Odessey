import { createRoot } from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { applyAppSettingsToDOM, getAppSettings } from "./lib/storage";
import "./index.css";

// Apply stored accessibility settings (reduce motion, larger text, high contrast) on startup
try {
  applyAppSettingsToDOM(getAppSettings());
} catch (e) {
  console.warn("Failed to apply initial settings:", e);
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

