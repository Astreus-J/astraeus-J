import { Logo } from "@/components/Logo";
import { FOOTER, SITE } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container border-t border-white/10 py-14">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo tone="dark" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{FOOTER.tagline}</p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-7">
            {FOOTER.columns.map((c) => (
              <div key={c.title}>
                <h2 className="text-sm font-medium text-white/50">{c.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-sm text-white/80 transition-colors hover:text-white">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h2 className="text-sm font-medium text-white/50">Contact</h2>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a href="#contact" className="text-sm text-white/80 transition-colors hover:text-white">
                    Start a project
                  </a>
                </li>
                {SITE.social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/80 transition-colors hover:text-white"
                    >
                      {s.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <p className="mt-14 text-sm border-t border-white/10 pt-6 text-white/45">
          © {new Date().getFullYear()} Astraeus
        </p>
      </div>
    </footer>
  );
}
