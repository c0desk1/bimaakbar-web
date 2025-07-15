import { useState, useEffect, useMemo } from "react";
import Card from "./Card";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import type { CollectionEntry } from "astro:content";

type Props = {
  projects: CollectionEntry<"projects">[];
  tags: string[];
};

export default function ProjectFilter({ projects, tags }: Props) {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const filteredProjects = useMemo(() => {
    return projects
      .filter(project =>
        project.data.title.toLowerCase().includes(search.toLowerCase()) ||
        project.data.summary.toLowerCase().includes(search.toLowerCase())
      )
      .filter(project => selectedTags.length === 0 || selectedTags.every(tag => project.data.tags.includes(tag)))
      .sort((a, b) => {
        const aTime = new Date(a.data.date).getTime();
        const bTime = new Date(b.data.date).getTime();
        return sortAsc ? aTime - bTime : bTime - aTime;
      });
  }, [projects, search, selectedTags, sortAsc]);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedTags, sortAsc]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  

  return (
    <section className="container mx-auto h-auto">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="sm:col-span-1 pt-13">
          <div className="sticky top-24">
            <SearchBar value={search} onChange={(e) => setSearch(e.target.value)}  />
            <div className="flex items-center justify-between w-full py-4">
              <p className="text-sm font-semibold uppercase text-[var(--color-fg)]">Kata Kunci</p>
              <div className="h-6">
                {selectedTags.length > 0 ? (
                  <button
                    onClick={() => setSelectedTags([])}
                    className="text-md flex items-center gap-1 font-medium text-[var(--color-muted)] hover:text-[var(--color-fg)] cursor-pointer transition" 
                    title="Clear Filters"
                  >
                    <i className="ri-close-line text-lg" />
                    <span className="hidden sm:inline">Hapus</span>
                  </button>
                ) : <span className="invisible">Hapus</span>}
              </div>
            </div>
            <ul className="flex flex-wrap sm:flex-col gap-2">
              {tags.map(tag => (
                <li key={tag} className="sm:w-full">
                  <button 
                    onClick={() => toggleTag(tag)} 
                    className={`w-full text-left px-3 py-2 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-hover)] text-md cursor-pointer ${selectedTags.includes(tag) ? "bg-[var(--color-hover)] text-[var(--color-fg)]" : "text-[var(--color-muted)] border-[var(--color-border)]"}`}>
                    {tag}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="sm:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm uppercase">
              Menampilkan {filteredProjects.length} dari {projects.length} proyek
            </div>
            <button onClick={() => setSortAsc(!sortAsc)} className="text-sm flex items-center gap-1 p-2 text-[var(--color-muted)] hover:text-[var(--color-fg)] uppercase cursor-pointer">
              {sortAsc ? "Terbaru" : "Terlama"}
              <i className={`ri-arrow-up-line transition ${sortAsc ? "rotate-0" : "rotate-180"}`} />
            </button>
          </div>
          <ul className="flex flex-col gap-3">
            {paginatedProjects.map(project => (
              <Card key={project.slug} entry={project} pill />
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredProjects.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </section>
  );
}