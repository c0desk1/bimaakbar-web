// src/components/Container.tsx

import React from 'react';
import type { ReactNode } from "react";

const con = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
}

interface Props {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  children: ReactNode;
}

const Container: React.FC<Props> = ({ size = "xl", children }) => {
  const containerClasses = con(
    "w-full h-full mx-auto px-5",
    size === "sm" && "max-w-screen-sm",
    size === "md" && "max-w-screen-md",
    size === "lg" && "max-w-screen-lg",
    size === "xl" && "max-w-screen-xl",
    size === "2xl" && "max-w-screen-2xl"
  );

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
};

export default Container;