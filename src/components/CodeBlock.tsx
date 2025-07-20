// src/components/CodeBlock.tsx
import { useState } from 'react';

type CodeProps = {
  children: {
    props: {
      className?: string;
      children: string;
    };
  };
};

export default function CodeBlock({ children }: CodeProps) {
  const [copied, setCopied] = useState(false);

  const rawCode = children?.props?.children?.trim?.() || '';
  const className = children?.props?.className || '';
  const langMatch = className.match(/language-(\w+)/);
  const lang = langMatch ? langMatch[1] : 'txt';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative group text-sm my-6">
      <div className="flex justify-between items-center px-4 py-2 bg-[var(--color-card-bg)] border-b border-[var(--color-border)] text-xs font-mono rounded-t-md">
        <span className="text-[var(--color-muted)]">{lang}</span>
        <button
          onClick={handleCopy}
          className="text-[var(--color-muted)] hover:text-[var(--color-fg)] transition"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-auto rounded-b-md bg-[var(--color-code-bg)] text-[var(--color-code-fg)] px-4 py-3 font-mono">
        <code className={`language-${lang}`}>{rawCode}</code>
      </pre>
    </div>
  );
}