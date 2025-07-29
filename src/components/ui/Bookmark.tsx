import React, { useState, useEffect } from 'react';
import { con } from "../../lib/utils"

function Bookmark() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [toast, setToast] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const storedBookmarks = localStorage.getItem('bookmarks');
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
  }, []);

  useEffect(() => {
    const currentPage = window.location.href;
    if (bookmarks.includes(currentPage)) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  }, [bookmarks]);

  const handleBookmark = () => {
    const currentPage = window.location.href;
    if (isBookmarked) {
      const newBookmarks = bookmarks.filter((bookmark) => bookmark !== currentPage);
      setBookmarks(newBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
      setToast('Bookmark dihapus!');
    } else {
      const newBookmarks = [...bookmarks, currentPage];
      setBookmarks(newBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
      setToast('Bookmark ditambahkan!');
    }
    setIsBookmarked(!isBookmarked);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };
  return (
    <div>
      <button onClick={handleBookmark} className={con("flex md:blok", "size-9 rounded-full p-2 items-center justify-center", "bg-transparent hover:bg-[var(--color-hover)]", "stroke-[var(--color-fg)] hover:stroke-[var(--color-fg)", "border border-[var(--color-border)]", "cursor-pointer")}>
        {isBookmarked ? (
            <svg id="drawer-open" stroke="var(--color-fg)" className="size-full pointer-events-none">
                <use href="/ui.svg#bookmarked"></use>
            </svg>
        ) : (
            <svg id="drawer-open" stroke="var(--color-fg)" className="size-full pointer-events-none">
                <use href="/ui.svg#bookmark"></use>
            </svg>
        )}
      </button>
      {toastVisible && (
        <div style={{
            position: 'fixed',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '20px',
            backgroundColor: 'var(--color-bg-secondary)',
            color: 'var(--color-fg)',
            padding: '10px',
            borderRadius: '8px',
            zIndex: '1000',
            animation: 'slideUp 0.5s',
        }} className="toast">
          {toast}
        </div>
      )}
      <style>
        {`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(100px);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }

        `}
      </style>
    </div>
  );
}

export default Bookmark;
