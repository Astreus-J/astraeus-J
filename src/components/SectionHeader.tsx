import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  id: string;
  title: string;
  lede?: string;
  className?: string;
};

export function SectionHeader({ id, title, lede, className }: SectionHeaderProps) {
  return (
    <header className={cn("reveal max-w-2xl", className)}>
      <h2 id={id} className="text-3xl font-semibold leading-[1.1] text-white sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {lede && <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">{lede}</p>}
    </header>
  );
}
