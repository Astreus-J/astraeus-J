import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { ConstellationMap } from "@/components/ConstellationMap";
import { HERO } from "@/content/site";

export function HeroSection() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pb-20 pt-28 sm:pb-28 sm:pt-40">
      <div className="container">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="text-sm text-white/60">{HERO.eyebrow}</p>
            <h1 id="hero-title" className="mt-5 max-w-[14ch] text-[2.75rem] font-semibold leading-[1.02] text-white sm:text-6xl lg:text-[4.25rem]">
              {HERO.title}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">{HERO.lede}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={HERO.primary.href}>
                {HERO.primary.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href={HERO.secondary.href} variant="secondary">
                {HERO.secondary.label}
              </ButtonLink>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[520px] px-0 sm:px-6 lg:col-span-5 lg:max-w-none lg:px-4">
            <ConstellationMap />
          </div>
        </div>
      </div>
    </section>
  );
}
