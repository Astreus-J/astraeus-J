# Astreus website

Corporate website for Astreus, a software engineering company. Single-page site built with React, TypeScript, Vite and Tailwind CSS.

## Development

```sh
npm install
npm run dev      # http://localhost:8080
npm run build    # production build in dist/
npm run lint
npm test
```

## Structure

- `src/content/site.ts` – all copy and data (services, work, expertise, process, company, contact options).
- `src/components/` – page sections and shared components.
- `src/hooks/` – contact form state and scroll reveal.
- `public/` – favicons, web manifest and social image.

## Deployment and domain

`robots.txt`, `sitemap.xml`, the canonical URL and Open Graph/JSON-LD URLs are generated at build time by `vite.config.ts`.
The site URL is `VITE_SITE_URL` if set, otherwise the Vercel production domain. To move to a custom domain, set
`VITE_SITE_URL=https://your-domain` in the hosting environment and redeploy.

## Contact form

The form sends through EmailJS (public client-side keys in `src/components/ContactSection.tsx`) with a client-side
submission throttle. See `SISTEMA_EMAIL.md` for the template setup.
