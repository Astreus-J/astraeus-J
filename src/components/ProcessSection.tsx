import { SectionHeader } from "@/components/SectionHeader";
import { PROCESS } from "@/content/site";

export function ProcessSection() {
  return (
    <section id="process" aria-labelledby="process-title" className="py-20 sm:py-28">
      <div className="container">
        <SectionHeader index="05" eyebrow={PROCESS.eyebrow} title={PROCESS.title} lede={PROCESS.lede} />

        <ol className="relative mt-14 grid gap-10 lg:grid-cols-6 lg:gap-0">
          <span className="absolute bottom-2 left-[5px] top-2 w-px bg-brand-blue/25 lg:hidden" aria-hidden />
          <span className="absolute left-0 right-0 top-[5px] hidden h-px bg-brand-blue/25 lg:block" aria-hidden />
          {PROCESS.steps.map((s, i) => (
            <li
              key={s.title}
              className="reveal relative pl-9 lg:pl-0 lg:pr-8 lg:pt-10"
              style={{ ["--d" as string]: `${i * 70}ms` }}
            >
              <span
                className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border border-brand-blue bg-paper lg:top-0"
                aria-hidden
              />
              <p className="meta text-ink/50">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1.5 text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
