import { useEffect, useState } from 'react';
import SkeletonArticle from './SkeletonArticle.tsx'

export function ContentWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <SkeletonArticle />
    );
  }

  return <>{children}</>;
}
