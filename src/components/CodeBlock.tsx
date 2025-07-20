import React, { useState } from 'react';
import clsx from 'clsx';

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const lang = className?.replace(/^language-/, '') || '';
  const rawCode = typeof children === 'string' ? children : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="relative group font-mono text-sm my-4 bg-[var(--color-code-bg)] border border-[var(--color-border)] rounded-md overflow-hidden">
      <div className="absolute top-0 right-0 z-10 p-2">
        <button
          onClick={handleCopy}
          className="text-xs px-2 py-1 rounded-md border bg-[var(--color-card-bg)] hover:bg-[var(--color-hover)] text-[var(--color-fg)]"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      {lang && (
        <div className="absolute top-0 left-0 text-[10px] font-semibold text-[var(--color-muted)] uppercase px-2 py-1">
          {lang}
        </div>
      )}
      <pre className={clsx('overflow-x-auto p-4', className)}>
        <code>{children}</code>
      </pre>
    </div>
  );
}