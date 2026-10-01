import { cn } from "@/lib/utils";

/** The Astraeus mark's geometry drawn as a large, quiet node-and-line outline. */
export function MarkWatermark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={cn("pointer-events-none absolute text-white", className)} aria-hidden>
      <g fill="none" stroke="currentColor" strokeOpacity="0.09" strokeWidth="0.5" vectorEffect="non-scaling-stroke">
        <path d="M14 80 L32 48 L50 16 L68 48 L86 80" vectorEffect="non-scaling-stroke" />
        <path d="M14 80 Q50 89 86 80" vectorEffect="non-scaling-stroke" />
        <path d="M32 48 Q50 41 68 48" vectorEffect="non-scaling-stroke" />
      </g>
      {[[14, 80], [32, 48], [50, 16], [68, 48], [86, 80]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
