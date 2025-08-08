import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary" | "outline";
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline rounded-full border px-2 py-0.5 text-sm font-semibold transition-colors",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}

const badgeVariants: Record<string, string> = {
  default: "bg-[var(--accent)] text-[var(--accent-foreground)] border-transparent",
  secondary: "bg-[var(--muted)] text-[var(--muted-foreground)] border-transparent",
  outline: "text-[var(--foreground)] border-[var(--border)]",
};
