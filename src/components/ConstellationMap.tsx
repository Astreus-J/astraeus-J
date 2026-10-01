import { STAGES, STAGE_EDGES } from "@/content/site";
import { cn } from "@/lib/utils";

const byId = Object.fromEntries(STAGES.map((s) => [s.id, s]));

const labelPosition = {
  left: "translate-x-3 -translate-y-1/2",
  right: "-translate-x-full -translate-y-1/2 -ml-3 text-right",
  above: "-translate-x-1/2 -translate-y-full -mt-3",
  below: "-translate-x-1/2 mt-3",
} as const;

/**
 * Astraeus Constellation System: business problem → engineering → systems →
 * infrastructure → products, drawn as a small connected graph.
 */
export function ConstellationMap({ className }: { className?: string }) {
  return (
    <>
      {/* ≥ sm: spatial map */}
      <figure
        className={cn("relative hidden aspect-square w-full sm:block", className)}
        aria-label="Astraeus connects business problems to engineering, systems, infrastructure and products."
      >
        <div className="grid-bg grid-fade absolute inset-0" aria-hidden />
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
          {/* coordinate ticks */}
          {[20, 40, 60, 80].map((t) => (
            <g key={t} stroke="hsl(var(--ink) / 0.25)" strokeWidth="0.25">
              <line x1={t} y1="0" x2={t} y2="1.8" />
              <line x1="0" y1={t} x2="1.8" y2={t} />
            </g>
          ))}
          {STAGE_EDGES.map(([a, b], i) => (
            <line
              key={a + b}
              x1={byId[a].x}
              y1={byId[a].y}
              x2={byId[b].x}
              y2={byId[b].y}
              pathLength={1}
              className="draw"
              style={{ ["--d" as string]: `${300 + i * 150}ms` }}
              stroke="hsl(var(--brand-blue))"
              strokeOpacity="0.55"
              strokeWidth="0.35"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {STAGES.map((s, i) => {
            const last = s.id === "N5";
            return (
              <g key={s.id} className="node-in" style={{ ["--d" as string]: `${i * 140}ms` }}>
                <circle cx={s.x} cy={s.y} r="3.2" fill="hsl(var(--paper))" stroke="hsl(var(--brand-blue))" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
                <circle cx={s.x} cy={s.y} r="1.1" fill={last ? "hsl(var(--brand-orange))" : "hsl(var(--brand-blue))"} />
              </g>
            );
          })}
        </svg>
        {STAGES.map((s) => (
          <div
            key={s.id}
            className={cn("absolute whitespace-nowrap", labelPosition[s.align])}
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
          >
            <p className="meta text-ink/50">{s.id}</p>
            <p className="text-sm font-medium text-ink">{s.label}</p>
          </div>
        ))}
        <p className="meta absolute bottom-0 left-0 text-ink/40" aria-hidden>
          System map / 05 nodes
        </p>
      </figure>

      {/* < sm: intentional vertical version */}
      <ol className={cn("relative sm:hidden", className)} aria-label="From business problem to product">
        <span className="absolute bottom-3 left-[5px] top-3 w-px bg-brand-blue/30" aria-hidden />
        {STAGES.map((s) => (
          <li key={s.id} className="relative flex items-center gap-4 py-3">
            <span
              className={cn(
                "relative z-10 h-[11px] w-[11px] rounded-full border border-brand-blue bg-paper",
                s.id === "N5" && "border-brand-orange-ink bg-brand-orange",
              )}
              aria-hidden
            />
            <span className="meta w-6 text-ink/50">{s.id}</span>
            <span className="text-sm font-medium text-ink">{s.label}</span>
          </li>
        ))}
      </ol>
    </>
  );
}
