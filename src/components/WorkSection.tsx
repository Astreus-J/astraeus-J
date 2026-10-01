import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { WORK, type Project } from "@/content/site";

function SystemLayers({ layers }: { layers: Project["layers"] }) {
  return (
    <ol className="relative" aria-label="Technology by layer">
      <span className="absolute bottom-3 left-[5px] top-3 w-px bg-brand-blue/25" aria-hidden />
      {layers.map((l) => (
        <li key={l.layer} className="relative flex gap-4 py-2.5">
          <span className="relative z-10 mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border border-brand-blue bg-white" aria-hidden />
          <div className="min-w-0">
            <p className="meta text-ink/50">{l.layer}</p>
            <p className="mt-0.5 font-mono text-[0.8125rem] text-ink">{l.tech.join("  ·  ")}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

const facts = (p: Project) =>
  [
    ["Challenge", p.challenge],
    ["Solution", p.solution],
    ["Engineering", p.engineering],
    ["Outcome", p.outcome],
  ] as const;

export function WorkSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-20 sm:py-28">
      <div className="container">
        <SectionHeader index="03" eyebrow={WORK.eyebrow} title={WORK.title} lede={WORK.lede} />

        <div className="mt-14 space-y-8">
          {WORK.projects.map((p) => (
            <article
              key={p.id}
              aria-labelledby={`${p.id}-title`}
              className="reveal grid overflow-hidden rounded-lg border border-border bg-white lg:grid-cols-12"
            >
              <div className="p-6 sm:p-8 lg:col-span-8 lg:p-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="meta text-ink/50">
                    {p.id} <span aria-hidden>/</span> {p.industry}
                  </p>
                  <p className="meta inline-flex items-center gap-2 text-brand-orange-ink">
                    <span className="node node-fill" aria-hidden />
                    {p.status}
                  </p>
                </div>

                <h3 id={`${p.id}-title`} className="mt-6 text-2xl font-semibold text-ink sm:text-3xl">
                  {p.name}
                </h3>
                <p className="mt-2 text-muted-foreground">{p.summary}</p>

                <dl className="mt-8 divide-y divide-border border-t border-border">
                  {facts(p).map(([k, v]) => (
                    <div key={k} className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                      <dt className="meta pt-0.5 text-ink/50">{k}</dt>
                      <dd className="text-[0.9375rem] leading-relaxed text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <ul className="flex flex-wrap gap-2" aria-label="Services">
                    {p.services.map((s) => (
                      <li key={s} className="rounded border border-border px-2.5 py-1 text-xs text-ink/70">
                        {s}
                      </li>
                    ))}
                  </ul>
                  {p.link && (
                    <a
                      href={p.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue underline-offset-4 hover:underline"
                    >
                      {p.link.label}
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="relative border-t border-border bg-paper p-6 sm:p-8 lg:col-span-4 lg:border-l lg:border-t-0 lg:p-10">
                <div className="grid-bg absolute inset-0 opacity-70" aria-hidden />
                <div className="relative">
                  <p className="meta mb-4 text-ink/50">Technology</p>
                  <SystemLayers layers={p.layers} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
