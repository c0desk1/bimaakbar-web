import React from "react";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl";

interface ContainerProps {
  size?: ContainerSize;
  children: React.ReactNode;
  className?: string;
}

export function con(...classes: unknown[]) {
    return classes
      .flatMap((c) => {
        if (typeof c === "string") return c;
        if (typeof c === "object" && c !== null) {
          return Object.entries(c)
            .filter(([_, value]) => Boolean(value))
            .map(([key]) => key);
        }
        return [];
      })
      .filter(Boolean)
      .join(" ");
  }

export const Container: React.FC<ContainerProps> = ({
  size = "xl",
  children,
  className,
}) => {
  return (
    <div
      className={con(
        "w-full h-full mx-auto px-5",
        size === "sm" && "max-w-screen-sm",
        size === "md" && "max-w-screen-md",
        size === "lg" && "max-w-screen-lg",
        size === "xl" && "max-w-screen-xl",
        size === "2xl" && "max-w-screen-2xl",
        className
      )}
    >
      {children}
    </div>
  );
};
