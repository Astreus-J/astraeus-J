import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  index: string;
  eyebrow: string;
  title: string;
  lede?: string;
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeader({ index, eyebrow, title, lede, tone = "light", className }: SectionHeaderProps) {
  const dark = tone === "dark";
  return (
    <header className={cn("reveal max-w-2xl", className)}>
      <p className={cn("meta flex items-center gap-3", dark ? "text-white/60" : "text-ink/60")}>
        <span className={cn("node node-fill", dark ? "text-brand-orange" : "text-brand-orange-ink")} aria-hidden />
        <span>{index}</span>
        <span aria-hidden className={cn("h-px w-8", dark ? "bg-white/25" : "bg-ink/25")} />
        <span>{eyebrow}</span>
      </p>
      <h2 id={`${eyebrow.toLowerCase()}-title`} className={cn("mt-5 text-3xl font-semibold leading-[1.1] sm:text-4xl", dark ? "text-white" : "text-ink")}>
        {title}
      </h2>
      {lede && (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", dark ? "text-white/70" : "text-muted-foreground")}>
          {lede}
        </p>
      )}
    </header>
  );
}
