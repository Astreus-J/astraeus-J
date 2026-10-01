import { SectionHeader } from "@/components/SectionHeader";
import { PROCESS } from "@/content/site";

export function ProcessSection() {
  return (
    <section id="process" aria-labelledby="process-title" className="py-20 sm:py-28">
      <div className="container">
        <SectionHeader index="05" eyebrow={PROCESS.eyebrow} title={PROCESS.title} lede={PROCESS.lede} />

        <ol className="relative mt-14 grid gap-10 lg:grid-cols-6 lg:gap-0">
          <span className="absolute bottom-2 left-[5px] top-2 w-px bg-brand-blue-light/40 lg:hidden" aria-hidden />
          
          {PROCESS.steps.map((s, i) => (
            <li
              key={s.title}
              className="reveal relative pl-9 lg:pl-0 lg:mt-[var(--step)] lg:pr-6 lg:pt-10"
              style={{ ["--d" as string]: `${i * 70}ms`, ["--step" as string]: `${i * 28}px` }}
            >
              {i < PROCESS.steps.length - 1 && (
                <>
                  <span className="absolute left-[11px] right-[-5px] top-[5px] hidden h-px bg-brand-blue-light/50 lg:block" aria-hidden />
                  <span className="absolute right-[-5px] top-[5px] hidden h-7 w-px bg-brand-blue-light/50 lg:block" aria-hidden />
                </>
              )}
              <span
                className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border border-brand-blue-light bg-paper lg:top-0"
                aria-hidden
              />
              <p className="meta text-white/50">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1.5 text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
