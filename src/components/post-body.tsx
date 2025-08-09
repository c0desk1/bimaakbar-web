// components/post-body.tsx
export default function PostBody({ children }: { children: React.ReactNode }) {
    return (
      <article className="prose max-w-none">
        {children}
      </article>
    );
  }
  