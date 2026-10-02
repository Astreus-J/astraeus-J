// Injects the server-rendered home page into dist/index.html so crawlers and
// users without JavaScript get the full content. Run after the client and SSR builds.
import { readFile, writeFile, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");
const htmlPath = path.join(root, "dist", "index.html");

const { render } = await import(pathToFileURL(ssrEntry).href);
const template = await readFile(htmlPath, "utf8");
const placeholder = '<div id="root"></div>';

if (!template.includes(placeholder)) {
  throw new Error("prerender: root placeholder not found in dist/index.html");
}

await writeFile(htmlPath, template.replace(placeholder, `<div id="root">${render()}</div>`));
await rm(path.join(root, "dist-ssr"), { recursive: true, force: true });
console.log("prerender: dist/index.html now contains the rendered page");
