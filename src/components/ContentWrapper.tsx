// src/components/ContentWrapper.tsx
import CodeBlock from './CodeBlock';
import type { MDXComponents } from 'astro';

const baseStyle = 'text-[var(--color-fg)] dark:text-[var(--color-fg)]';

export const ContentWrapper: MDXComponents = {
  h1: (props) => <h1 {...props} className={`mt-8 mb-4 text-4xl font-bold ${baseStyle}`} />,
  h2: (props) => <h2 {...props} className={`mt-8 mb-4 text-3xl font-semibold ${baseStyle}`} />,
  h3: (props) => <h3 {...props} className={`mt-6 mb-2 text-2xl font-semibold ${baseStyle}`} />,
  h4: (props) => <h4 {...props} className={`mt-6 mb-2 text-xl font-medium ${baseStyle}`} />,
  p: (props) => <p {...props} className={`mb-4 leading-relaxed ${baseStyle}`} />,
  a: (props) => <a {...props} className="text-[var(--color-link)] underline underline-offset-4 hover:text-[var(--color-hover)]" />,
  ul: (props) => <ul {...props} className="list-disc list-inside mb-4" />,
  ol: (props) => <ol {...props} className="list-decimal list-inside mb-4" />,
  li: (props) => <li {...props} className="mb-1" />,
  blockquote: (props) => (
    <blockquote {...props} className="border-l-4 border-[var(--color-border)] pl-4 italic text-[var(--color-muted)] my-6" />
  ),
  img: (props) => <img {...props} className="rounded-md border border-[var(--color-border)] my-4 max-w-full" />,
  code: (props) => <code {...props} className="px-1 py-0.5 rounded bg-[var(--color-muted-bg)] text-[var(--color-fg)] text-sm" />,
  pre: (props) => <CodeBlock {...props} />,
  table: (props) => <table {...props} className="table-auto border-collapse w-full my-6" />,
  thead: (props) => <thead {...props} className="bg-[var(--color-muted-bg)] text-left" />,
  tbody: (props) => <tbody {...props} />,
  tr: (props) => <tr {...props} className="border-t border-[var(--color-border)]" />,
  th: (props) => <th {...props} className="p-2 font-semibold" />,
  td: (props) => <td {...props} className="p-2" />,
};