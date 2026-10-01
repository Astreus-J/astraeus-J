import { SectionHeader } from "@/components/SectionHeader";
import { COMPANY } from "@/content/site";

export function CompanySection() {
  return (
    <section id="company" aria-labelledby="company-title" className="border-t border-border bg-white py-20 sm:py-28">
      <div className="container">
        <SectionHeader index="04" eyebrow={COMPANY.eyebrow} title={COMPANY.title} />

        <div className="reveal mt-10 grid gap-8 lg:grid-cols-12">
          <p className="text-xl leading-snug text-ink sm:text-2xl lg:col-span-7">{COMPANY.statement}</p>
          <p className="leading-relaxed text-muted-foreground lg:col-span-4 lg:col-start-9">{COMPANY.detail}</p>
        </div>

        <ul className="mt-16 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {COMPANY.principles.map((p, i) => (
            <li
              key={p.title}
              className="reveal border-b border-r border-border p-6 sm:p-8"
              style={{ ["--d" as string]: `${(i % 3) * 60}ms` }}
            >
              <span className="meta text-brand-orange-ink">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
