import { useState, useMemo } from 'react';
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

interface Props {
  posts: any[];
  categories: string[];
}

const BlogFilter = ({ posts, categories }: Props) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredPosts = useMemo(() => {
    return posts
      .filter(post => post.data.title.toLowerCase().includes(search.toLowerCase()) || post.data.summary.toLowerCase().includes(search.toLowerCase()))
      .filter(post => selectedCategory === "" || post.data.category === selectedCategory)
      .sort((a, b) => {
        const aTime = new Date(a.data.date).getTime();
        const bTime = new Date(b.data.date).getTime();
        return sortAsc ? aTime - bTime : bTime - aTime;
      });
  }, [posts, search, selectedCategory, sortAsc]);

  const paginatedPosts = useMemo(() => {
    return filteredPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [filteredPosts, currentPage]);

  return (
    <>
      <div className="sticky top-16 w-full flex flex-col md:flex-row bg-[var(--color-bg)] gap-4">
        <div className="flex-1">
          <ul className="flex flex-row max-w-screen overflow-x-auto py-4">
            {categories.map(category => (
              <li key={category} className="px-1">
                <button onClick={() => setSelectedCategory(category)} className={`text-ellipsis truncate w-fit text-center px-2 py-1 rounded-full border border-[var(--color-border)] hover:bg-[var(--color-hover)] text-sm cursor-pointer ${selectedCategory === category ? "bg-[var(--color-hover)] text-[var(--color-fg)]" : "text-[var(--color-muted)] border-[var(--color-border)]"}`}>
                  {category}
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
          <button onClick={() => setSortAsc(!sortAsc)} className="rounded-full text-sm flex items-center gap-1 px-2 py-1 text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-hover)] uppercase cursor-pointer">
            {sortAsc ? "Terbaru" : "Terlama"}
            <i className={`ri-arrow-up-line transition ${sortAsc ? "rotate-0" : "rotate-180"}`} />
          </button>
        </div>
        <ul className="flex flex-col gap-3">
          {paginatedPosts.map((post) => (
            <Card key={post.slug} entry={post} />
          ))}
        </ul>
        <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredPosts.length / itemsPerPage)} onPageChange={(page) => setCurrentPage(page)} />
      </section>
    </>
  );
};

export default BlogFilter;
