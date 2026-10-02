import { renderToString } from "react-dom/server";
import App from "./App";

/** Used at build time (scripts/prerender.mjs) to emit the page as static HTML. */
export function render(): string {
  return renderToString(<App />);
}
