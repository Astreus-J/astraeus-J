import { SectionHeader } from "@/components/SectionHeader";
import { PROCESS } from "@/content/site";

/** Steps descend along a trajectory line, the same device used in the hero map. */
export function ProcessSection() {
  return (
    <section id="process" aria-labelledby="process-title" className="section">
      <div className="container">
        <SectionHeader id="process-title" title={PROCESS.title} lede={PROCESS.lede} />

        <ol className="section-body relative grid gap-9 lg:grid-cols-6 lg:gap-0">
          <span className="absolute bottom-2 left-[5px] top-2 w-px bg-brand-blue-light/40 lg:hidden" aria-hidden />
          {PROCESS.steps.map((s, i) => (
            <li
              key={s.title}
              className="relative pl-9 lg:pl-0 lg:pr-6 lg:pt-9"
              style={{ ["--step" as string]: `${i * 26}px` }}
            >
              {i < PROCESS.steps.length - 1 && (
                <>
                  <span className="absolute left-[11px] right-[-5px] top-[5px] hidden h-px bg-brand-blue-light/50 lg:block lg:mt-[var(--step)]" aria-hidden />
                  <span className="absolute right-[-5px] top-[5px] hidden h-[26px] w-px bg-brand-blue-light/50 lg:mt-[var(--step)] lg:block" aria-hidden />
                </>
              )}
              <span
                className={`absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border border-brand-blue-light bg-paper lg:top-0 lg:mt-[var(--step)] ${
                  i === PROCESS.steps.length - 1 ? "bg-brand-blue-light" : ""
                }`}
                aria-hidden
              />
              <div className="lg:mt-[var(--step)]">
                <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
