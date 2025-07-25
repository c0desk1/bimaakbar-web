'use client';

import { useState, useMemo, useEffect } from 'react';
import PostCard from '../components/PostCard';
import FilterPosts from '../components/FilterPosts';
import SortPosts from './SortPosts';
import Pagination from '../components/Pagination';
import SkeletonCard from '../components/SkeletonCard';
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

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

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
      <p className="text-center text-sm text-[var(--color-muted)] py-12">
        Tidak ada postingan.
      </p>
    );
  }

  return (
    <>
    <div className="flex flex-col py-6 gap-2 items-center">
      <div className="flex-col flex-1">
        <section id='filter-posts' aria-label='filter postingan'>
          <FilterPosts search={search} setSearch={setSearch} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories} />
        </section>
        <section role="region" aria-labelledby="post-section-title">
          <h2 id="post-section-title" className="sr-only">Daftar Postingan</h2>
          <div className="flex justify-between items-center py-4">
            <div className="text-sm uppercase text-[var(--color-muted)]">
              Menampilkan {filteredPosts.length} dari {posts.length} postingan
            </div>
            <SortPosts sortAsc={sortAsc} toggleSort={() => setSortAsc(!sortAsc)} />
          </div>
        </section>
      </div>
      <div className="flex-col flex-1">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                className="my-6 px-4 py-2 rounded-full text-sm font-medium bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-fg)] hover:bg-[var(--color-hover)] transition cursor-pointer">
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
