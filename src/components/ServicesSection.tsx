import { SectionHeader } from "@/components/SectionHeader";
import { SERVICES } from "@/content/site";

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="border-t border-border py-20 sm:py-28">
      <div className="container">
        <SectionHeader index="01" eyebrow={SERVICES.eyebrow} title={SERVICES.title} lede={SERVICES.lede} />

        <ol className="mt-14 border-b border-border">
          {SERVICES.items.map((s, i) => (
            <li
              key={s.id}
              className="reveal group grid gap-4 border-t border-border py-9 md:grid-cols-12 md:gap-8"
              style={{ ["--d" as string]: `${i * 50}ms` }}
            >
              <h3 className="text-2xl font-semibold text-white transition-colors group-hover:text-brand-blue-light sm:text-3xl md:col-span-5">
                {s.title}
              </h3>
              <div className="md:col-span-7">
                <p className="max-w-xl text-white/70">{s.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-1 text-[0.9375rem] text-white">
                  {s.points.map((p) => (
                    <li key={p} className="after:ml-2 after:text-brand-orange after:content-['/'] last:after:content-none">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
