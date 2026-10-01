import { SectionHeader } from "@/components/SectionHeader";
import { SERVICES } from "@/content/site";

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="mt-20 bg-white py-20 sm:py-28">
      <div className="container grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeader index="01" eyebrow={SERVICES.eyebrow} title={SERVICES.title} lede={SERVICES.lede} />
          </div>
        </div>

        <ol className="relative lg:col-span-8">
          <span className="absolute bottom-2 left-[5px] top-2 w-px bg-brand-blue/25" aria-hidden />
          {SERVICES.items.map((s, i) => (
            <li
              key={s.id}
              className="reveal relative pb-12 pl-9 last:pb-0 sm:pl-12"
              style={{ ["--d" as string]: `${i * 60}ms` }}
            >
              <span
                className="absolute left-0 top-2 h-[11px] w-[11px] rounded-full border border-brand-blue bg-white"
                aria-hidden
              />
              <p className="meta text-ink/50">{s.id}</p>
              <h3 className="mt-2 text-xl font-semibold text-ink sm:text-2xl">{s.title}</h3>
              <p className="mt-2 max-w-xl text-muted-foreground">{s.summary}</p>
              <ul className="mt-5 grid gap-x-8 gap-y-2 border-t border-border pt-5 text-sm text-ink sm:grid-cols-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <span className="h-px w-3 bg-brand-orange-ink" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
