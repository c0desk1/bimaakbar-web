import * as React from "react";

interface IconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Icon = React.forwardRef<HTMLButtonElement, IconProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-full border border-[var(--border)] md:border-transparent p-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${className}`}
        {...props}>
        {children}
      </button>
    );
  }
);

Icon.displayName = "Icon";

export { Icon };