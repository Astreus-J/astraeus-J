import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "top", label: "Home" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "work", label: "Work" },
  { id: "expertise", label: "Expertise" },
  { id: "company", label: "Company" },
  { id: "contact", label: "Contact" },
] as const;

/** Page-level trajectory: one line, one node per section, the active node follows the scroll. */
export function RailNav() {
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Page sections" className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 2xl:block">
      <ul className="relative flex flex-col gap-5">
        <span className="absolute inset-y-1 left-[4px] w-px bg-white/15" aria-hidden />
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-label={s.label}
              aria-current={active === s.id ? "true" : undefined}
              className="group flex items-center gap-3"
            >
              <span
                className={cn(
                  "relative z-10 block h-[9px] w-[9px] rounded-full border transition-colors",
                  active === s.id ? "border-brand-blue-light bg-brand-blue-light" : "border-white/50 bg-paper group-hover:border-white",
                )}
              />
              <span className="pointer-events-none -ml-1 rounded-sm bg-graphite px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                {s.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
