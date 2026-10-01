import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary" | "onDark" | "onDarkSecondary";
};

const variants = {
  primary: "bg-brand-orange text-ink hover:bg-brand-orange/90 border-transparent",
  secondary: "bg-transparent text-white border-white/25 hover:border-white/60 hover:bg-white/[0.03]",
  onDark: "bg-brand-orange text-ink hover:bg-brand-orange/90 border-transparent",
  onDarkSecondary: "bg-transparent text-white border-white/25 hover:border-white/60",
} as const;

export function ButtonLink({ variant = "primary", className, children, ...props }: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-sm border px-5 text-sm font-medium transition-colors",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
