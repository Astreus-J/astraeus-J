import { STAGES, STAGE_EDGES } from "@/content/site";
import { cn } from "@/lib/utils";

const byId = Object.fromEntries(STAGES.map((s) => [s.id, s]));

const labelPosition = {
  left: "-translate-x-full -translate-y-1/2 -ml-4 text-right",
  right: "-translate-y-1/2 ml-4",
  above: "-translate-x-1/2 -translate-y-full -mt-4",
  below: "-translate-x-1/2 mt-4",
} as const;

function edgePath(a: string, b: string, bend = 0) {
  const p = byId[a];
  const q = byId[b];
  const mx = (p.x + q.x) / 2;
  const my = (p.y + q.y) / 2;
  const dx = q.x - p.x;
  const dy = q.y - p.y;
  const len = Math.hypot(dx, dy) || 1;
  return `M${p.x} ${p.y} Q${mx + (-dy / len) * bend} ${my + (dx / len) * bend} ${q.x} ${q.y}`;
}

/**
 * Astraeus Constellation System. The five stages — business problem,
 * engineering, systems, infrastructure, products — sit on the geometry of the
 * Astraeus mark and are connected like a small system diagram.
 */
export function ConstellationMap({ className }: { className?: string }) {
  return (
    <>
      <figure
        className={cn("relative hidden aspect-square w-full sm:block", className)}
        aria-label="Astraeus connects business problems to engineering, systems, infrastructure and products."
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
          {STAGE_EDGES.map(([a, b, bend], i) => (
            <path
              key={a + b}
              d={edgePath(a, b, bend)}
              fill="none"
              pathLength={1}
              className="draw"
              style={{ ["--d" as string]: `${300 + i * 160}ms` }}
              stroke={bend ? "hsl(var(--brand-blue-light))" : "hsl(0 0% 100%)"}
              strokeOpacity={bend ? 0.7 : 0.35}
              strokeWidth={bend ? 0.9 : 0.6}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {STAGES.map((s, i) => (
            <g key={s.id} className="node-in" style={{ ["--d" as string]: `${i * 140}ms` }}>
              <circle cx={s.x} cy={s.y} r="2.6" fill="hsl(var(--paper))" stroke="hsl(0 0% 100%)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <circle cx={s.x} cy={s.y} r={s.id === "N5" ? 1.4 : 0.9} fill={s.id === "N5" ? "hsl(var(--brand-orange))" : "hsl(var(--brand-blue-light))"} />
            </g>
          ))}
        </svg>
        {STAGES.map((s) => (
          <div
            key={s.id}
            className={cn("absolute whitespace-nowrap", labelPosition[s.align])}
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
          >
            <p className="text-[0.9375rem] font-medium text-white">{s.label}</p>
            <p className="meta text-white/45">
              {s.x} / {s.y}
            </p>
          </div>
        ))}
      </figure>

      <ol className={cn("relative sm:hidden", className)} aria-label="From business problem to product">
        <span className="absolute bottom-3 left-[5px] top-3 w-px bg-white/25" aria-hidden />
        {STAGES.map((s) => (
          <li key={s.id} className="relative flex items-center gap-4 py-3">
            <span
              className={cn(
                "relative z-10 h-[11px] w-[11px] rounded-full border border-white bg-paper",
                s.id === "N5" && "border-brand-orange bg-brand-orange",
              )}
              aria-hidden
            />
            <span className="text-sm font-medium text-white">{s.label}</span>
          </li>
        ))}
      </ol>
    </>
  );
}
