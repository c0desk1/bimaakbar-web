// src/app/blog/[slug]/components/PostBody.tsx

interface PostBodyProps { content: string; }

export default function PostBody({ content }: PostBodyProps) {
    return (
        <article
            className="prose"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
  }