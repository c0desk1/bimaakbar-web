import { useState, useMemo } from "react";
import Card from "./Card";
import SearchBar from "./SearchBar";
import type { CollectionEntry } from "astro:content";

type Props = {
  posts: CollectionEntry<"blog">[];
  tags: string[];
};

export default function BlogFilter({ posts, tags }: Props) {
    const [search, setSearch] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [sortAsc, setSortAsc] = useState(true);

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
    }, [search, selectedTags, sortAsc]);

    const toggleTag = (tag: string) => {
        setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    };

    return (
        <section className="container mx-auto h-auto py-16 md:py-16">
            <div className="grid grid-rows-1 sm:grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-1 pt-16">
                    <div className="sticky top-28">
                        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts" />
                        <div className="flex items-center justify-between w-full mt-4 mb-2">
                            <p className="text-sm font-semibold uppercase text-[var(--color-fg)]">Tags</p>
                            <div className="h-6">
                                {selectedTags.length > 0 ? (
                                <button
                                    onClick={() => setSelectedTags([])}
                                    className="flex items-center gap-1 text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-fg)] cursor-pointer transition"
                                    title="Clear Filters"
                                >
                                    <i className="ri-close-line text-base" />
                                    <span className="hidden sm:inline">Clear</span>
                                </button>
                                ) : (
                                <span className="invisible">Clear</span>
                                )}
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
                <div className="col-span-3 sm:col-span-2 pt-2">
                    <div className="flex flex-col">
                        <div className='flex justify-between flex-row text-center items-center mb-4'>
                            <div className="text-sm uppercase">
                                <span>Showing {filteredPosts.length} of {posts.length} posts</span>
                            </div>
                            <button onClick={() => setSortAsc(!sortAsc)} className="flex flex-row items-center gap-1 p-2 text-[var(--color-muted)] hover:text-[var(--color-fg)] uppercase cursor-pointer">
                                {sortAsc ? "Ascending" : "Descending"}  
                                <i className={`ri-arrow-up-line transition ${sortAsc ? 'rotate-0' : 'rotate-180'}`}></i>  
                            </button>
                        </div>
                        <ul className="flex flex-col gap-3">
                            {filteredPosts.map(post => (
                                <Card key={post.slug} entry={post} pill />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
