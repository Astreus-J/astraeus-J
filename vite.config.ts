import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * Resolves the public site URL once (VITE_SITE_URL, else the Vercel production
 * domain, else localhost), injects it into index.html and emits robots.txt and
 * sitemap.xml. Setting VITE_SITE_URL is all that is needed to move to a custom domain.
 */
function siteMeta(siteUrl: string): Plugin {
  return {
    name: "astreus-site-meta",
    transformIndexHtml: {
      order: "pre",
      handler: (html) => html.replaceAll("%SITE_URL%", siteUrl),
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n  </url>\n</urlset>\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const siteUrl = (env.VITE_SITE_URL || (vercelHost ? `https://${vercelHost}` : "http://localhost:8080")).replace(/\/$/, "");

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: { overlay: false },
    },
    plugins: [react(), siteMeta(siteUrl)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "react-router-dom"],
          },
        },
      },
    },
  };
});
