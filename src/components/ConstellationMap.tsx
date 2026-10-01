import { useState } from "react";
import { STAGES, STAGE_EDGES } from "@/content/site";
import { cn } from "@/lib/utils";

const byId = Object.fromEntries(STAGES.map((s) => [s.id, s]));

const labelPosition = {
  left: "-translate-x-full -translate-y-1/2 -ml-5 text-right",
  right: "-translate-y-1/2 ml-5",
  above: "-translate-x-1/2 -translate-y-full -mt-5",
  below: "-translate-x-1/2 mt-5",
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
 * Astraeus mark. Hovering or focusing a node explains that stage.
 */
export function ConstellationMap({ className }: { className?: string }) {
  const [activeId, setActiveId] = useState<string>("N1");
  const active = byId[activeId];

  return (
    <>
      <figure className={cn("hidden sm:block", className)} aria-label="Astraeus connects business problems to engineering, systems, infrastructure and products.">
        <div className="relative aspect-square w-full">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
            {STAGE_EDGES.map(([a, b, bend], i) => {
              const lit = a === activeId || b === activeId;
              return (
                <path
                  key={a + b}
                  d={edgePath(a, b, bend)}
                  fill="none"
                  pathLength={1}
                  className="draw"
                  style={{ ["--d" as string]: `${300 + i * 160}ms`, transition: "stroke-opacity .25s, stroke .25s" }}
                  stroke={lit ? "hsl(var(--brand-orange))" : bend ? "hsl(var(--brand-blue-light))" : "hsl(0 0% 100%)"}
                  strokeOpacity={lit ? 0.9 : bend ? 0.7 : 0.35}
                  strokeWidth={bend ? 0.9 : 0.6}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
            {STAGES.map((s, i) => {
              const on = s.id === activeId;
              return (
                <g key={s.id} className="node-in" style={{ ["--d" as string]: `${i * 140}ms` }}>
                  <circle cx={s.x} cy={s.y} r={on ? 3.6 : 2.6} fill="hsl(var(--paper))" stroke={on ? "hsl(var(--brand-orange))" : "hsl(0 0% 100%)"} strokeWidth="1" vectorEffect="non-scaling-stroke" style={{ transition: "r .2s" }} />
                  <circle cx={s.x} cy={s.y} r={on || s.id === "N5" ? 1.4 : 0.9} fill={on || s.id === "N5" ? "hsl(var(--brand-orange))" : "hsl(var(--brand-blue-light))"} />
                </g>
              );
            })}
          </svg>

          {STAGES.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={s.id === activeId}
              onMouseEnter={() => setActiveId(s.id)}
              onFocus={() => setActiveId(s.id)}
              onClick={() => setActiveId(s.id)}
              className="group absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
            >
              <span className="sr-only">{s.label}</span>
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute whitespace-nowrap transition-colors",
                  labelPosition[s.align],
                  s.id === activeId ? "text-white" : "text-white/70",
                )}
                style={{ left: "50%", top: "50%" }}
              >
                <span className="block text-[0.9375rem] font-medium">{s.label}</span>
                <span className="meta block text-white/45">
                  {s.x} / {s.y}
                </span>
              </span>
            </button>
          ))}
        </div>

        <figcaption className="mt-6 min-h-[4.5rem] max-w-sm border-l border-brand-orange pl-4" aria-live="polite">
          <p className="text-sm font-medium text-white">{active.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-white/65">{active.text}</p>
        </figcaption>
      </figure>

      <ol className={cn("relative sm:hidden", className)} aria-label="From business problem to product">
        <span className="absolute bottom-3 left-[5px] top-3 w-px bg-white/25" aria-hidden />
        {STAGES.map((s) => (
          <li key={s.id} className="relative flex gap-4 py-3">
            <span
              className={cn(
                "relative z-10 mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border border-white bg-paper",
                s.id === "N5" && "border-brand-orange bg-brand-orange",
              )}
              aria-hidden
            />
            <span>
              <span className="block text-sm font-medium text-white">{s.label}</span>
              <span className="mt-0.5 block text-sm leading-relaxed text-white/60">{s.text}</span>
            </span>
          </li>
        ))}
      </ol>
    </>
  );
}
