import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ButtonLink } from "@/components/ButtonLink";
import { NAV } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors",
        scrolled || open ? "border-b border-border bg-paper/95 backdrop-blur-sm" : "border-b border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>
      <div className="container">
        <nav aria-label="Primary" className="flex h-16 items-center justify-between">
          <a href="#top" aria-label="Astraeus, back to top" onClick={() => setOpen(false)}>
            <Logo />
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV.filter((n) => n.href !== "#contact").map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-sm text-ink/70 transition-colors hover:text-ink">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ButtonLink href="#contact" className="hidden h-9 px-4 md:inline-flex">
              Start a project
            </ButtonLink>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-border bg-paper md:hidden">
          <ul className="container flex flex-col py-2">
            {NAV.map((n, i) => (
              <li key={n.href} className="border-b border-border last:border-0">
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 text-base text-ink"
                >
                  {n.label}
                  <span className="meta text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
