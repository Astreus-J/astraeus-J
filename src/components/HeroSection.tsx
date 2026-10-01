import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { ConstellationMap } from "@/components/ConstellationMap";
import { HERO, SERVICES } from "@/content/site";

export function HeroSection() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 sm:pt-36">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="meta flex items-center gap-3 text-ink/60">
              <span className="node node-fill text-brand-orange-ink" aria-hidden />
              {HERO.eyebrow}
            </p>
            <h1
              id="hero-title"
              className="mt-6 max-w-[16ch] text-[2.5rem] font-semibold leading-[1.04] text-ink sm:text-5xl lg:text-[3.5rem]"
            >
              {HERO.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {HERO.lede}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={HERO.primary.href}>
                {HERO.primary.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href={HERO.secondary.href} variant="secondary">
                {HERO.secondary.label}
              </ButtonLink>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[520px] lg:col-span-5 lg:max-w-none">
            <ConstellationMap />
          </div>
        </div>

        <ul className="mt-16 hidden border-t border-border sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.items.map((s, i) => (
            <li key={s.id} className="border-b border-border py-4 sm:border-b-0 sm:pr-6 lg:py-5">
              <span className="meta text-ink/40">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-1 text-sm font-medium text-ink">{s.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
