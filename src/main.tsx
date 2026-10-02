import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root")!;

// The home page is prerendered at build time, so hydrate it. Any other path
// renders the 404 view from scratch.
if (root.hasChildNodes() && window.location.pathname === "/") {
  hydrateRoot(root, <App />);
} else {
  root.replaceChildren();
  createRoot(root).render(<App />);
}
