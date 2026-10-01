import { MarkWatermark } from "@/components/MarkWatermark";
import { SectionHeader } from "@/components/SectionHeader";
import { COMPANY } from "@/content/site";

export function CompanySection() {
  return (
    <section id="company" aria-labelledby="company-title" className="relative overflow-hidden border-t border-border bg-graphite py-20 sm:py-28">
      <MarkWatermark className="-right-32 -top-32 h-[40rem] w-[40rem]" />
      <div className="container relative">
        <SectionHeader index="04" eyebrow={COMPANY.eyebrow} title={COMPANY.title} />

        <div className="reveal mt-10 grid gap-8 lg:grid-cols-12">
          <p className="text-2xl leading-snug text-white sm:text-3xl lg:col-span-8">{COMPANY.statement}</p>
          <p className="leading-relaxed text-white/65 lg:col-span-4 lg:self-end">{COMPANY.detail}</p>
        </div>

        <ol className="mt-16 grid gap-x-16 border-b border-white/10 md:grid-cols-2">
          {COMPANY.principles.map((p, i) => (
            <li key={p.title} className="reveal grid grid-cols-[2.5rem_1fr] gap-4 border-t border-white/10 py-7">
              <span className="font-mono text-sm text-brand-orange">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-white/65">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
