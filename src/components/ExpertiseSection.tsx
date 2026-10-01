import { SectionHeader } from "@/components/SectionHeader";
import { EXPERTISE } from "@/content/site";

export function ExpertiseSection() {
  return (
    <section
      id="expertise"
      aria-labelledby="expertise-title"
      className="relative overflow-hidden bg-graphite py-20 text-white sm:py-28"
    >
      <div
        className="grid-bg grid-fade absolute inset-0 [--grid:rgba(255,255,255,0.05)]"
        aria-hidden
      />
      <div className="container relative">
        <SectionHeader index="02" eyebrow={EXPERTISE.eyebrow} title={EXPERTISE.title} lede={EXPERTISE.lede} tone="dark" />

        <dl className="mt-14 border-t border-white/10">
          {EXPERTISE.groups.map((g, i) => (
            <div
              key={g.label}
              className="reveal grid gap-3 border-b border-white/10 py-6 md:grid-cols-12 md:gap-8 md:py-7"
              style={{ ["--d" as string]: `${i * 40}ms` }}
            >
              <dt className="md:col-span-3">
                <span className="meta block text-white/40">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-1 block text-lg font-medium">{g.label}</span>
              </dt>
              <dd className="md:col-span-4">
                <p className="text-sm leading-relaxed text-white/65">{g.focus}</p>
              </dd>
              <dd className="md:col-span-5">
                <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.8125rem] text-white/90">
                  {g.tech.map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-brand-blue-light" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
