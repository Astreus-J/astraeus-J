import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { WORK, type Project } from "@/content/site";

function Stack({ layers }: { layers: Project["layers"] }) {
  return (
    <ol aria-label="Technology by layer" className="relative">
      <span className="absolute bottom-3 left-[5px] top-3 w-px bg-brand-blue-light/50" aria-hidden />
      {layers.map((l) => (
        <li key={l.layer} className="relative flex gap-4 py-2.5">
          <span className="relative z-10 mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border border-brand-blue-light bg-paper" aria-hidden />
          <div>
            <p className="text-xs text-white/50">{l.layer}</p>
            <p className="mt-0.5 font-mono text-[0.875rem] text-white">{l.tech.join("  ·  ")}</p>
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

        <div className="mt-14">
          {WORK.projects.map((p) => (
            <article
              key={p.id}
              aria-labelledby={`${p.id}-title`}
              className="reveal grid gap-10 border-t border-border py-12 lg:grid-cols-12 lg:gap-14"
            >
              <div className="lg:col-span-7">
                <p className="text-sm text-white/55">
                  {p.id} · {p.industry} ·{" "}
                  <span className="text-brand-orange">{p.status}</span>
                </p>
                <h3 id={`${p.id}-title`} className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
                  {p.name}
                </h3>
                <p className="mt-3 text-lg text-white/70">{p.summary}</p>

                <dl className="mt-8 space-y-5">
                  {facts(p).map(([k, v]) => (
                    <div key={k} className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
                      <dt className="text-sm text-white/50">{k}</dt>
                      <dd className="text-[0.9375rem] leading-relaxed text-white">{v}</dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-7 text-sm text-white/55">{p.services.join("  ·  ")}</p>
                {p.link && (
                  <a
                    href={p.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue-light underline-offset-4 hover:underline"
                  >
                    {p.link.label}
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>

              <div className="lg:col-span-5">
                <div className="bg-deep p-7 sm:p-9">
                  <p className="mb-4 text-sm font-medium text-white">Technology</p>
                  <Stack layers={p.layers} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
