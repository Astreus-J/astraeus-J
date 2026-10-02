import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { WORK, type Project } from "@/content/site";

/** Projects grouped by honest ownership (Astreus Products, Client Work, Astreus Labs...). */
const groups = Object.entries(
  WORK.projects.reduce<Record<string, Project[]>>((acc, p) => {
    (acc[p.collection] ??= []).push(p);
    return acc;
  }, {}),
);

const rows = (p: Project) =>
  [
    ["Problem", p.context],
    ["Solution", p.solution],
    ["Engineering", p.highlight],
    ["Capabilities", p.demonstrates],
  ] as const;

export function WorkSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="section">
      <div className="container">
        <SectionHeader id="work-title" title={WORK.title} lede={WORK.lede} />

        <div className="section-body">
          {groups.map(([collection, projects]) => (
            <div key={collection} className="mb-12 last:mb-0">
              {groups.length > 1 && <h3 className="mb-4 text-sm font-medium text-white/60">{collection}</h3>}
              <div className="border-b border-white/10">
          {projects.map((p) => (
            <article
              key={p.id}
              aria-labelledby={`${p.id}-title`}
              className="grid gap-8 border-t border-white/10 py-10 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-4">
                <h3 id={`${p.id}-title`} className="text-3xl font-semibold text-white sm:text-4xl">
                  {p.name}
                </h3>
                <p className="mt-3 text-sm text-white/65">{p.category}</p>
                <p className="mt-1 text-sm text-white/65">{p.status}</p>
                {p.link && (
                  <a
                    href={p.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 py-2 text-sm font-medium text-brand-blue-light underline-offset-4 hover:underline"
                  >
                    {p.link.label}
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>

              <dl className="space-y-5 lg:col-span-8">
                {rows(p).map(([k, v]) => (
                  <div key={k} className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-6">
                    <dt className="text-sm text-white/60">{k}</dt>
                    <dd className="max-w-2xl text-[0.9375rem] leading-relaxed text-white">{v}</dd>
                  </div>
                ))}
                <div className="grid gap-1 border-t border-white/10 pt-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
                  <dt className="text-sm text-white/60">Technology</dt>
                  <dd className="font-mono text-[0.8125rem] leading-relaxed text-white/80">{p.technology.join("  ·  ")}</dd>
                </div>
              </dl>
            </article>
          ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
