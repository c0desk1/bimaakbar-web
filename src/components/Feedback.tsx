import { useState } from "react";

export default function Feedback() {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (i: number) => {
    setSelected(i === selected ? null : i);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div
        className={`bg-[var(--color-card-bg)] text-[var(--color-fg)] border border-[var(--color-border)] transition-all duration-300 ease-in-out overflow-hidden ${
          selected !== null ? "rounded-xl max-h-[260px]" : "rounded-full max-h-12"
        }`}>
        <div className="flex justify-between items-center px-4 py-3">
          <span className="text-sm text-[var(--color-muted)]">Was this helpful?</span>
          <div className="flex items-center gap-1.5">
            {icons.map((icon, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                aria-label={icon.label}
                className={`w-8 h-8 p-1 rounded-full transition-colors duration-200 hover:bg-[var(--color-hover)] ${
                  selected === i ? "bg-white/10 ring-1 ring-white/20" : ""
                }`}
                dangerouslySetInnerHTML={{ __html: icon.svg }}
              />
            ))}
          </div>
        </div>
        <div
          className={`transition-all duration-300 ease-in-out px-4 pb-4 ${
            selected !== null
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <textarea
            placeholder="Your feedback..."
            className="w-full mt-2 rounded-md bg-black border border-white/10 px-3 py-2 text-sm text-white placeholder-white/40 resize-y focus:outline-none focus:ring-1 focus:ring-white/30"
          />
          <div className="flex items-center justify-between mt-2 text-xs text-white/40">
            <span>
              <kbd className="bg-white/10 px-1 py-0.5 rounded text-[10px]">⌘</kbd>+<kbd className="bg-white/10 px-1 py-0.5 rounded text-[10px]">Enter</kbd> to submit
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setSelected(null)}
                className="text-sm px-3 py-1 rounded bg-transparent border border-white/10 hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button className="text-sm px-3 py-1 rounded bg-white text-black hover:bg-white/90 transition">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const icons = [
  {
    label: "Star Eye",
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="w-full h-full text-white" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M12 4c3.314 0 6 3.134 6 7s-2.686 7-6 7-6-3.134-6-7 2.686-7 6-7zm0 0l1.5 2.5m0 0L16 7m-2.5-.5L14 4m-2 4.5L10 4m2 4.5L8 7m2.5-.5L10 4" />
      </svg>
    `,
  },
  {
    label: "Smile",
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="w-full h-full text-white" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M12 4a8 8 0 100 16 8 8 0 000-16zm-3 8h.01M15 12h.01M9 16s1.5 2 3 2 3-2 3-2" />
      </svg>
    `,
  },
  {
    label: "Neutral",
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="w-full h-full text-white" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M12 4a8 8 0 100 16 8 8 0 000-16zm-3 8h.01M15 12h.01M9 16h6" />
      </svg>
    `,
  },
  {
    label: "Cry",
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="w-full h-full text-white" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M12 4a8 8 0 100 16 8 8 0 000-16zm-3 8h.01M15 12h.01M15 16s-1.5-2-3-2-3 2-3 2M10 17l.5 1m3-1l-.5 1" />
      </svg>
    `,
  },
];
