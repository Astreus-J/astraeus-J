import { SectionHeader } from "@/components/SectionHeader";
import { EXPERTISE } from "@/content/site";

export function ExpertiseSection() {
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="section bg-deep">
      <div className="container">
        <SectionHeader id="expertise-title" title={EXPERTISE.title} lede={EXPERTISE.lede} />

        <dl className="section-body border-b border-white/15">
          {EXPERTISE.groups.map((g) => (
            <div key={g.label} className="grid gap-2 border-t border-white/15 py-6 md:grid-cols-12 md:gap-8">
              <dt className="text-lg font-semibold text-white md:col-span-3">{g.label}</dt>
              <dd className="text-[0.9375rem] leading-relaxed text-white/70 md:col-span-4">{g.focus}</dd>
              <dd className="font-mono text-[0.8125rem] leading-relaxed text-white md:col-span-5">
                {g.tech.join("  ·  ")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
