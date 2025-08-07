// components/ui/Button.tsx
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "default" | "accent" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
};

export function Button({
  children,
  variant = "default",
  size = "md",
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--radius)] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ring)] disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}

const variantStyles: Record<string, string> = {
  default: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90",
  accent: "bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent)]/90",
  outline: "border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]",
  ghost: "text-[var(--muted-foreground)] hover:bg-[var(--muted)]",
  destructive: "bg-red-600 text-[var(--foreground)] hover:bg-red-700",
};

const sizeStyles: Record<string, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};
