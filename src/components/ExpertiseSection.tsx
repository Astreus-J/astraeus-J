import { SectionHeader } from "@/components/SectionHeader";
import { EXPERTISE } from "@/content/site";

export function ExpertiseSection() {
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="bg-deep py-20 text-white sm:py-28">
      <div className="container">
        <SectionHeader index="02" eyebrow={EXPERTISE.eyebrow} title={EXPERTISE.title} lede={EXPERTISE.lede} />

        <dl className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {EXPERTISE.groups.map((g) => (
            <div key={g.label} className="reveal border-l border-white/25 pl-6">
              <dt className="text-xl font-semibold">{g.label}</dt>
              <dd className="mt-1 text-sm text-white/65">{g.focus}</dd>
              <dd className="mt-4 text-[1.0625rem] leading-relaxed text-white">
                {g.tech.join("  ·  ")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
