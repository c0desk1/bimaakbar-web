import { useState, useEffect, useMemo } from "react";
import Card from "./Card";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import { normalizePosts } from "../lib/utils";
import type {BlogPost} from '../types';

type Props = {
  tags: string[];
};

export default function BlogFilter({ tags }: Props) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLikijBJVpFFinhzOpVR2WFvM5G99r8fxt4qwwiwK13eT_ObaqIzs0FJ3oMvp3IDRFgK9LHzX9re5Rkh5UeEJpvqx4AJHwFbnxy-ZyU-ft1WEe36FDWzo9EI4YmT0bjXqpDQW9Dz3EjoFCfpI_nEFwHddA8fy6ln2zlgZ0CqG_oFsyS1WjeoeNC_rv9tWhKGJTlwte8canTDt4WuvRmj6kbJN4XkFu4l-oLzP_WpK0GX51K8f1WD-ClsUc2C1DwIXNC5UQqFKK1gHrwnE7Zn72f3W2un3w&lib=MbqCDhfTk0JNU9lNMZQa7uj8Rq9Cotphv/exec');
        const rawData = await res.json();
        const normalized = normalizePosts(rawData);
        setPosts(normalized);
      } catch (error) {
        console.error("Gagal fetch post:", error);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts
      .filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase())
      )
      .filter(post =>
        selectedTags.length === 0 || selectedTags.every(tag => post.tags.includes(tag))
      )
      .sort((a, b) => {
        const aTime = new Date(a.date).getTime();
        const bTime = new Date(b.date).getTime();
        return sortAsc ? aTime - bTime : bTime - aTime;
      });
  }, [posts, search, selectedTags, sortAsc]);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(start, start + itemsPerPage);
  }, [filteredPosts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedTags, sortAsc]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <>
      <div className="sticky top-16 w-full flex flex-col md:flex-row bg-[var(--color-bg)] gap-4">
        <div className="flex-1">
          <ul className="flex flex-row max-w-screen overflow-x-auto py-4">
            {tags.map(tag => (
              <li key={tag} className="px-1">
                <button
                  onClick={() => toggleTag(tag)}
                  className={`text-ellipsis truncate w-fit text-center px-2 py-1 rounded-full border border-[var(--color-border)] hover:bg-[var(--color-hover)] text-sm cursor-pointer ${
                    selectedTags.includes(tag)
                      ? "bg-[var(--color-hover)] text-[var(--color-fg)]"
                      : "text-[var(--color-muted)] border-[var(--color-border)]"
                  }`}
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-auto md:max-w-[40%] py-4">
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <section>
        <div className="flex justify-between items-center py-4">
          <div className="text-sm uppercase">
            Menampilkan {filteredPosts.length} dari {posts.length} postingan
          </div>
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="rounded-full text-sm flex items-center gap-1 px-2 py-1 text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-hover)] uppercase cursor-pointer"
          >
            {sortAsc ? "Terbaru" : "Terlama"}
            <i className={`ri-arrow-up-line transition ${sortAsc ? "rotate-0" : "rotate-180"}`} />
          </button>
        </div>

        <ul className="flex flex-col gap-3">
          {paginatedPosts.map((post) => (
            <Card
              key={post.slug}
              entry={{
                slug: post.slug,
                data: {
                  title: post.title,
                  summary: post.content,
                  date: new Date(post.date),
                  tags: post.tags,
                },
              }}
              pill
            />
          ))}
        </ul>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredPosts.length / itemsPerPage)}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </section>
    </>
  );
}
