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
      <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] pointer-events-none" />
      <input name="search" type="search" placeholder={placeholder} value={value} onChange={onChange} className="w-full pl-10 pr-3 h-8 rounded-full border border-[var(--color-border)] bg-transparent text-[var(--color-fg)]"/>
    </div>
  );
}
