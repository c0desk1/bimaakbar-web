// src/components/ReadingProgress.tsx
import React, { useState, useEffect } from 'react';

const ReadingProgress = () => {
  const [width, setWidth] = useState(0);

  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setWidth(progress);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="reading-progress-bar"
      style={{ width: `${width}%` }}
    />
  );
};

export default ReadingProgress;