//src/components/SearchBar.tsx
import React from "react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder = "Cari..." }: Props) {
  return (
    <div className="relative text-sm min-w-[40%]">
        <svg stroke="var(--color-fg)" className="size-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <use href="/ui.svg#search"></use>
        </svg>
      <input name="search" type="search" placeholder={placeholder} value={value} onChange={onChange} className="w-full pl-10 pr-3 h-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-fg)] focus:outline-none focus:ring-1.5 focus:ring-[var(--color-accent)] focus:bg-[var(--color-bg-secondary)]"/>
    </div>
  );
}
