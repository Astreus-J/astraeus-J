import { Logo } from "@/components/Logo";
import { FOOTER, SITE } from "@/content/site";

const linkClass = "inline-block py-1 text-sm text-white/75 transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="border-t border-border">
      {/* Trajectory: the Astreus device closes the page */}
      <div className="container" aria-hidden>
        <div className="relative h-px bg-brand-blue-light/30">
          {[14, 32, 50, 68, 86].map((x, i) => (
            <span
              key={x}
              className={`absolute top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border bg-paper ${
                i === 4 ? "border-brand-orange bg-brand-orange" : "border-brand-blue-light"
              }`}
              style={{ left: `${x}%` }}
            />
          ))}
        </div>
      </div>

      <div className="container pb-10 pt-14">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{FOOTER.tagline}</p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            {FOOTER.columns.map((c) => (
              <div key={c.title}>
                <h2 className="text-sm font-semibold text-white">{c.title}</h2>
                <ul className="mt-3">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className={linkClass}>
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h2 className="text-sm font-semibold text-white">Contact</h2>
              <ul className="mt-3">
                <li>
                  <a href="#contact" className={linkClass}>
                    Start a project
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SITE.email}`} className={`${linkClass} break-all`}>
                    Email
                  </a>
                </li>
                {SITE.social.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {s.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <p className="mt-14 border-t border-white/10 pt-6 text-sm text-white/60"><span suppressHydrationWarning>© {new Date().getFullYear()} Astreus</span></p>
      </div>
    </footer>
  );
}
