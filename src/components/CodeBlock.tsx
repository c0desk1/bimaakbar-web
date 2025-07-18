import { useEffect, useState } from 'react';

type CodeBlockProps = {
  code: string;
  lang?: string;
  filename?: string;
};

export default function CodeBlock({ code, lang = 'text', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
  };

  return (
    <div className="not-prose my-6 overflow-hidden rounded-md border border-[var(--color-border)] dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
      <div className="flex items-center justify-between px-4 py-2 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono border-b border-zinc-300 dark:border-zinc-700">
        <div className="flex items-center gap-2">
          {lang && <span className="capitalize">{lang}</span>}
          {filename && <span className="text-zinc-500">({filename})</span>}
        </div>
        <button
          onClick={handleCopy}
          className="rounded px-2 py-1 text-[11px] border border-zinc-400 dark:border-zinc-600 hover:bg-zinc-200 dark:hover:bg-zinc-700"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre
        className={`language-${lang} text-[13px] overflow-auto px-4 py-3 bg-zinc-50 dark:bg-zinc-900 leading-[1.4]`}
        style={{ counterReset: 'line' }}
        dangerouslySetInnerHTML={{ __html: code }}
      />
    </div>
  );
}
