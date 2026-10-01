import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  index: string;
  eyebrow: string;
  title: string;
  lede?: string;
  className?: string;
};

/** `eyebrow` is the section name; it only feeds the heading id used by aria-labelledby. */
export function SectionHeader({ index, eyebrow, title, lede, className }: SectionHeaderProps) {
  return (
    <header className={cn("reveal max-w-2xl", className)}>
      <p className="font-mono text-sm text-brand-blue-light" aria-hidden>
        {index}
      </p>
      <h2 id={`${eyebrow.toLowerCase()}-title`} className="mt-3 text-4xl font-semibold leading-[1.05] text-white sm:text-5xl">
        {title}
      </h2>
      {lede && <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">{lede}</p>}
    </header>
  );
}
