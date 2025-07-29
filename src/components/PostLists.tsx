'use client';

import { useState, useMemo, useEffect } from 'react';
import PostCard from '../components/PostCard';
import FilterPosts from '../components/FilterPosts';
import SortPosts from './SortPosts';
import Pagination from '../components/Pagination';
import SkeletonCard from './ui/SkeletonCard';
import { fetchBlog } from '../utils/fetchBlog';
import type { Post } from '../types';

const BlogFilter = () => {
  const [posts, setPosts] = useState<Post[]>([]);
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        const titleMatch = post.title?.toLowerCase().includes(search.toLowerCase()) ?? false;

        const descriptionMatch = post.description?.toLowerCase().includes(search.toLowerCase()) ?? false;

        const categoryMatch =
        selectedCategory === '' ||
        (post.category && post.category.trim().toUpperCase() === selectedCategory.trim().toUpperCase());

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

  const handleViewAllByCategory = () => {
    if (!selectedCategory) return;
    window.location.href = `/blog/${encodeURIComponent(selectedCategory)}`;
  };
  

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

  if (posts.length === 0) {
    return (
      <>
      <main>
        <p className="text-center text-xl text-[var(--color-muted)]/50 py-12">
          Tidak ada postingan yang ditemukan.
        </p>
        <a href="/" className="group flex w-auto mt-6 items-center justify-center rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] px-2 py-1 text-[var(--color-fg)] hover:bg-[var(--color-hover)]">
          <div className="flex w-auto text-center items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="items-center stroke-[var(--color-muted)] group-hover:stroke-[var(--color-fg)]">
              <line x1="19" y1="12" x2="5" y2="12" className="scale-x-0 group-hover:scale-x-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300 ease-in-out" />
              <polyline points="12 19 5 12 12 5" className="translate-x-1 group-hover:translate-x-0 transition-all duration-300 ease-in-out" />
            </svg>
            <span>
              Kembali ke Beranda
            </span>
          </div>
        </a>
      </main>
      </>
    );
  }

  return (
    <>
    <div className="flex flex-col gap-2 items-center">
      <div className="flex-col w-full items-center">
        <section id='filter-posts' aria-label='filter postingan' className='w-full'>
          <FilterPosts search={search} setSearch={setSearch} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories} />
        </section>
        <section role="region" aria-labelledby="post-section-title" className='w-full'>
          <h2 id="post-section-title" className="sr-only">Daftar Postingan</h2>
          <div className="flex justify-between items-center py-4">
            <div className="text-sm uppercase text-[var(--color-muted)] flex-1">
              Menampilkan {filteredPosts.length} dari {posts.length} postingan
            </div>
            <SortPosts sortAsc={sortAsc} toggleSort={() => setSortAsc(!sortAsc)} />
          </div>
        </section>
      </div>
      <div className="flex-col flex-1 w-full">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
              {paginatedPosts.map((post) => (
                <li key={`${post.slug}-${post.date ?? 'no-date'}`}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
        </div>
      <div className="flex flex-col flex-shrink-0">
        <section id='filter-posts' aria-label='filter postingan'>
          {selectedCategory && (
            <button
              onClick={handleViewAllByCategory}
              className="my-6 px-4 py-2 rounded-full text-sm font-medium bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-fg)] hover:bg-[var(--color-hover)] cursor-pointer">
              Lihat semua postingan: {selectedCategory}
            </button>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)} />
        </section>
      </div>
    </div>
    </>
  );
};

export default BlogFilter;
