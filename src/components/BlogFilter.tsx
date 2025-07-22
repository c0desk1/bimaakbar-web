//blogfilter.tsx
import { useState, useMemo, useEffect } from 'react'
import Card from "../components/Card.tsx"
import SearchBar from "../components/SearchBar.tsx"
import Pagination from "../components/Pagination.tsx"
import { useLoading } from "../context/LoadingContext";

interface Props {
  posts: any[]
  categories: string[]
}

const BlogFilter = ({ posts, categories }: Props) => {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortAsc, setSortAsc] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const { setLoading } = useLoading()
  const itemsPerPage = 6

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [search, selectedCategory, currentPage, sortAsc]);

  useEffect(() => {
    setCurrentPage(1)
  }, [search, selectedCategory, sortAsc])

  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        const titleMatch = post.data.title.toLowerCase().includes(search.toLowerCase())
        const descriptionMarch = post.data.description?.toLowerCase().includes(search.toLowerCase()) ?? false
        const categoryMatch = selectedCategory === "" || post.data.category === selectedCategory
        return (titleMatch || descriptionMarch) && categoryMatch
      })
      .sort((a, b) => {
        const aTime = new Date(a.data.pubDate).getTime()
        const bTime = new Date(b.data.pubDate).getTime()
        return sortAsc ? aTime - bTime : bTime - aTime
      })
  }, [posts, search, selectedCategory, sortAsc])

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage)
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredPosts.slice(start, start + itemsPerPage)
  }, [filteredPosts, currentPage])

  return (
    <>
      <div className="sticky top-16 w-full flex flex-col md:flex-row bg-[var(--color-bg)] gap-4 z-10">
      <div className="flex-1">
        <ul className="flex flex-row overflow-x-auto py-4 items-center">
          {["", ...categories].map((category, index) => (
            <li key={index} className="px-1">
              <button
                onClick={() => setSelectedCategory(category)}
                className={`text-ellipsis truncate px-2 py-1 rounded-full border border-[var(--color-border)] text-sm cursor-pointer ${
                  selectedCategory === category
                    ? "bg-[var(--color-hover)] text-[var(--color-fg)]"
                    : "text-[var(--color-muted)] border-[var(--color-border)]"
                }`}
              >
                {category === "" ? "Semua" : category}
              </button>
            </li>
          ))}
          {selectedCategory !== "" && (
            <li className="px-1">
              <button
                onClick={() => setSelectedCategory("")}
                className="flex items-center gap-1 text-sm px-2 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-fg)]">
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
      <section>
        <div className="flex justify-between items-center py-4">
          <div className="text-sm uppercase text-[var(--color-muted)]">
            Menampilkan {filteredPosts.length} dari {posts.length} postingan
          </div>
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="rounded-full text-sm flex items-center gap-1 px-2 py-1 text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-hover)] uppercase cursor-pointer"
          >
            {sortAsc ? "Terlama" : "Terbaru"}
            <i className={`ri-arrow-up-line transition ${sortAsc ? "rotate-180" : "rotate-0"}`} />
          </button>
        </div>
        <ul className="flex flex-col gap-3">
          {paginatedPosts.map((post) => (
            <Card key={post.slug} entry={post} />
          ))}
        </ul>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </section>
    </>
  )
}

export default BlogFilter
