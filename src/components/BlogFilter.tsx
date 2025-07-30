"use client";

import { useState, useMemo, useEffect } from "react";
import PostCard from "./PostCard";
import FilterPosts from "./FilterPosts";
import SortPosts from "./SortPosts";
import Pagination from "./Pagination";
import SkeletonCard from "./ui/SkeletonCard";
import type { Post } from "../types";

export default function BlogFilter() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortAsc, setSortAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch(import.meta.env.CMS_API_URL)
      .then((res) => res.json())
      .then((data: Post[]) => {
        setPosts(data);

        const uniqueCategories = Array.from(
          new Set(
            data
              .map((p) => p.category?.trim())
              .filter((cat): cat is string => !!cat && cat.length > 0)
          )
        );

        setCategories(uniqueCategories);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal fetch posts:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, sortAsc]);

  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        const titleMatch = post.title
          ?.toLowerCase()
          .includes(search.toLowerCase());
        const descMatch = post.description
          ?.toLowerCase()
          .includes(search.toLowerCase());
        const categoryMatch =
          selectedCategory === "" ||
          (post.category &&
            post.category.trim().toLowerCase() ===
              selectedCategory.trim().toLowerCase());

        return (titleMatch || descMatch) && categoryMatch;
      })
      .sort((a, b) => {
        const aTime = new Date(a.date || "").getTime();
        const bTime = new Date(b.date || "").getTime();
        return sortAsc ? aTime - bTime : bTime - aTime;
      });
  }, [posts, search, selectedCategory, sortAsc]);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(itemsPerPage)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <p className="text-center text-xl text-[var(--color-muted)]">
        Tidak ada postingan ditemukan.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <FilterPosts
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      <div className="flex justify-between items-center">
        <span className="text-sm text-[var(--color-muted)]">
          Menampilkan {filteredPosts.length} dari {posts.length} postingan
        </span>
        <SortPosts sortAsc={sortAsc} toggleSort={() => setSortAsc(!sortAsc)} />
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedPosts.map((post) => (
          <li key={`${post.slug}-${post.date ?? "no-date"}`}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
