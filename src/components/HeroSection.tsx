import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { ConstellationMap } from "@/components/ConstellationMap";
import { HERO } from "@/content/site";

export function HeroSection() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pt-28 sm:pt-36">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h1 id="hero-title" className="max-w-[15ch] text-[2.5rem] font-semibold leading-[1.05] text-white sm:text-5xl lg:text-[3.75rem]">
              {HERO.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">{HERO.lede}</p>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-white/60">{HERO.audience}</p>
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

          <div className="mx-auto w-full max-w-[460px] px-0 sm:px-6 lg:col-span-5 lg:max-w-none lg:px-4">
            <ConstellationMap />
          </div>
        </div>

        <ul
          aria-label="Capabilities"
          className="mt-16 flex flex-wrap gap-x-6 gap-y-2 border-t border-border py-6 text-sm text-white/75 lg:mt-20"
        >
          {HERO.capabilities.map((c) => (
            <li key={c}>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
