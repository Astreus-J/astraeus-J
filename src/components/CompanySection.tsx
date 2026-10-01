import { SectionHeader } from "@/components/SectionHeader";
import { COMPANY } from "@/content/site";

export function CompanySection() {
  return (
    <section id="company" aria-labelledby="company-title" className="section bg-graphite">
      <div className="container">
        <SectionHeader id="company-title" title={COMPANY.title} />

        <div className="section-body grid gap-8 lg:grid-cols-12 lg:gap-12">
          <p className="max-w-2xl text-xl leading-snug text-white sm:text-2xl lg:col-span-7">{COMPANY.statement}</p>
          <p className="leading-relaxed text-white/70 lg:col-span-5 lg:self-end">{COMPANY.detail}</p>
        </div>

        <ul className="section-body grid gap-x-12 border-b border-white/10 md:grid-cols-2">
          {COMPANY.principles.map((p) => (
            <li key={p.title} className="border-t border-white/10 py-6">
              <h3 className="text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-1.5 max-w-md text-[0.9375rem] leading-relaxed text-white/70">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
