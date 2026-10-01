import mark from "@/assets/astraeus-mark.png";
import markLight from "@/assets/astraeus-mark-light.png";
import { cn } from "@/lib/utils";

type LogoProps = {
  tone?: "light" | "dark";
  className?: string;
};

/** Astraeus wordmark. `tone` describes the background it sits on. */
export function Logo({ tone = "dark", className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img
        src={tone === "dark" ? markLight : mark}
        alt=""
        width={28}
        height={28}
        className="h-7 w-7"
      />
      <span
        className={cn(
          "text-[1.0625rem] font-semibold uppercase tracking-[0.16em]",
          tone === "dark" ? "text-white" : "text-white",
        )}
      >
        Astraeus
      </span>
    </span>
  );
}
