import { useEffect, useState } from 'react';
import SkeletonCard from './SkeletonCard.tsx'

export function ContentWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <SkeletonCard />
    );
  }

  return <>{children}</>;
}
