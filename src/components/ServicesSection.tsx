import { SectionHeader } from "@/components/SectionHeader";
import { SERVICES } from "@/content/site";

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="section">
      <div className="container">
        <SectionHeader id="services-title" title={SERVICES.title} lede={SERVICES.lede} />

        <ol className="section-body border-b border-border">
          {SERVICES.items.map((s) => (
            <li key={s.id} className="grid gap-3 border-t border-border py-8 md:grid-cols-12 md:gap-8">
              <h3 className="text-xl font-semibold text-white sm:text-2xl md:col-span-4">{s.title}</h3>
              <div className="md:col-span-8">
                <p className="max-w-xl text-lg leading-snug text-white">{s.summary}</p>
                <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-white/60">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
