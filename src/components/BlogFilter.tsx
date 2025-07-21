import { useState, useEffect, useMemo } from "react";
import Card from "./Card";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import type { CollectionEntry } from "astro:content";

type Props = {
  posts: CollectionEntry<"blog">[];
  tags: string[];
};

export default function BlogFilter({ posts, tags }: Props) {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const filteredPosts = useMemo(() => {
        return posts
        .filter(post =>
            post.data.title.toLowerCase().includes(search.toLowerCase()) ||
            post.data.summary.toLowerCase().includes(search.toLowerCase())
        )
        .filter(post => selectedTags.length === 0 || selectedTags.every(tag => post.data.tags.includes(tag)))
        .sort((a, b) => {
            const aTime = new Date(a.data.date).getTime();
            const bTime = new Date(b.data.date).getTime();
            return sortAsc ? aTime - bTime : bTime - aTime;
        });
  }, 
  
  [posts, search, selectedTags, sortAsc]);

  const paginatedPosts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredPosts.slice(start, start + itemsPerPage);
  },
  
  [filteredPosts, currentPage]);
    
  useEffect(() => {
        setCurrentPage(1);
  },
  
  [search, selectedTags, sortAsc]);

  const toggleTag = (tag: string) => {
        setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  return (
    <>
      <div className="sticky top-16 w-full flex flex-col md:flex-row bg-[var(--color-bg)] py-4 gap-4">
        <div className="flex-1">
          <ul className="flex flex-row max-w-screen overflow-x-auto">
            {tags.map(tag => (
              <li key={tag} className="px-1">
                <button onClick={() => toggleTag(tag)}className={`text-ellipsis truncate w-fit text-center px-2 py-1 rounded-full border border-[var(--color-border)] hover:bg-[var(--color-hover)] text-sm cursor-pointer ${selectedTags.includes(tag) ? "bg-[var(--color-hover)] text-[var(--color-fg)]" : "text-[var(--color-muted)] border-[var(--color-border)]"}`}>
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-auto md:max-w-[40%]">
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <section>
        <div className="flex justify-between items-center py-4">
          <div className="text-sm uppercase">Menampilkan {filteredPosts.length} dari {posts.length} postingan</div>
          <button onClick={() => setSortAsc(!sortAsc)} className="rounded-full text-sm flex items-center gap-1 px-2 py-1 text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-hover)] uppercase cursor-pointer">
            {sortAsc ? "Terbaru" : "Terlama"}
            <i className={`ri-arrow-up-line transition ${sortAsc ? "rotate-0" : "rotate-180"}`} />
          </button>
        </div>
        <ul className="flex flex-col gap-3">
          {paginatedPosts.map(posts => (
            <Card key={posts.slug} entry={posts} pill />
          ))}
        </ul>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredPosts.length / itemsPerPage)}
          onPageChange={(page) => setCurrentPage(page)} />
      </section>
    </>
  );
}
