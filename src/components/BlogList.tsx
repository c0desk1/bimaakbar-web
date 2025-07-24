'use client';

import { useState, useMemo, useEffect } from 'react';
import PostCard from '../components/PostCard.tsx';
import SearchBar from '../components/SearchBar.tsx';
import Pagination from '../components/Pagination.tsx';
import SkeletonCard from '../components/SkeletonCard.tsx';
import { fetchBlog } from '../utils/fetchBlog';
import type { Blog } from '../types';

const BlogFilter = () => {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortAsc, setSortAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchBlog().then((data) => {
      setPosts(data);

      const uniqueCategories = Array.from(
        new Set(
          data
            .map((post) => post.category?.trim())
            .filter((cat): cat is string => Boolean(cat && cat.length > 0))
        )
      );

      setCategories(uniqueCategories);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, sortAsc]);

  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        const titleMatch = post.title?.toLowerCase().includes(search.toLowerCase()) ?? false;
        const descriptionMatch = post.description?.toLowerCase().includes(search.toLowerCase()) ?? false;
        const categoryMatch = selectedCategory === '' || post.category === selectedCategory;
        return (titleMatch || descriptionMatch) && categoryMatch;
      })
      .sort((a, b) => {
        const aTime = new Date(a.date || '').getTime();
        const bTime = new Date(b.date || '').getTime();
        return sortAsc ? aTime - bTime : bTime - aTime;
      });
  }, [posts, search, selectedCategory, sortAsc]);  

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(start, start + itemsPerPage);
  }, [filteredPosts, currentPage]);

  if (loading) {
    return (
      <section className="py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(itemsPerPage)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Filter bar */}
      <div className="sticky top-16 w-full flex flex-col md:flex-row bg-[var(--color-bg)] gap-4 z-10">
        <div className="flex-1">
          <ul className="flex flex-row overflow-x-auto py-4 items-center">
            {['', ...categories].map((category, index) => (
              <li key={index} className="px-1">
                <button
                  aria-label={`Filter kategori ${category || 'Semua'}`}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-ellipsis truncate px-2 py-1 rounded-full border border-[var(--color-border)] text-sm cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-[var(--color-hover)] text-[var(--color-fg)]'
                      : 'text-[var(--color-muted)] border-[var(--color-border)]'
                  }`}
                >
                  {category || 'Semua'}
                </button>
              </li>
            ))}
            {selectedCategory !== '' && (
              <li className="px-1">
                <button
                  aria-label={`Reset kategori ${selectedCategory}`}
                  onClick={() => setSelectedCategory('')}
                  className="flex items-center gap-1 text-sm px-2 rounded-full border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-fg)] cursor-pointer">
                  <i className="ri-close-line text-lg" />
                  Reset
                </button>
              </li>
            )}
          </ul>
        </div>

        <div className="w-auto md:max-w-[40%] py-4">
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Content section */}
      <section role="region" aria-labelledby="post-section-title">
        <h2 id="post-section-title" className="sr-only">Daftar Postingan</h2>
        <div className="flex justify-between items-center py-4">
          <div className="text-sm uppercase text-[var(--color-muted)]">
            Menampilkan {filteredPosts.length} dari {posts.length} postingan
          </div>
          <button
            aria-label={sortAsc ? 'Urut: Terlama' : 'Urut: Terbaru'}
            onClick={() => setSortAsc(!sortAsc)}
            className="rounded-full text-sm flex items-center gap-1 px-2 py-1 text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-hover)] uppercase cursor-pointer">
            {sortAsc ? 'Terlama' : 'Terbaru'}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
              fill="currentColor"
              className={`transition-transform ${sortAsc ? 'rotate-180' : 'rotate-0'}`}>
              <path d="M11.293 7.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1-1.414 1.414L12 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414l6-6z" />
            </svg>
          </button>
        </div>

        {/* Post list */}
        <ul className="flex flex-col gap-3">
          {paginatedPosts.map((post) => (
            <li key={`${post.slug}-${post.date || 'unknown'}`}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </section>
    </>
  );
};

export default BlogFilter;
