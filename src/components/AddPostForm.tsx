import { useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'simplemde/dist/simplemde.min.css';

export default function MarkdownEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="w-full">
      <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
        Konten Blog
      </label>
      <div className="border border-[--color-border] rounded-md overflow-hidden shadow-sm bg-[--color-bg] text-[--color-fg]">
  <SimpleMDE
    value={value}
    onChange={onChange}
    options={{
      spellChecker: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: 'add-post-content',
      },
      placeholder: 'Tulis konten markdown kamu...',
      status: false,
    }}
  />
</div>


    </div>
  );
}
