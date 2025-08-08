import { getAllPosts } from "@/lib/posts";
import type { PostMeta } from "@/types";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Hero from "@/components/ui/Hero";
import TagPostList from "@/components/TagPostList";
import { capitalizeFirstLetter } from "@/lib/utils";
import { siteConfig } from "@/config";

type Params = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const slug = (await params).slug
  return {
    title: `${capitalizeFirstLetter((await params).slug)}`,
    description: `Artikel dengan tag ${( await params).slug}.`,
    alternates: {
      canonical: `${siteConfig.url}/tags/${(slug)}`,
    },
    openGraph: {
      title: `${capitalizeFirstLetter(slug)}`,
      description: `Artikel dalam kategori ${capitalizeFirstLetter(slug)}.`,
      url: `${siteConfig.url}/tags/${(slug)}`,
      siteName: siteConfig.name,
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title: `${capitalizeFirstLetter(slug)}`,
      description: `Artikel dalam kategori ${capitalizeFirstLetter(slug)}.`,
    },
  };
}

export default async function TagPage({ params }: Params) {
  const allPosts = await getAllPosts();
  const slug = ( await params).slug.toLowerCase()

  const filteredPosts = allPosts.filter((post: PostMeta) =>
    post.tags?.map((tag) => tag.toLowerCase()).includes(slug)
  );

  if (filteredPosts.length === 0) {
    return notFound();
  }

  return (
    <section className="py-12">
      <Hero
        title={capitalizeFirstLetter(( await params).slug)}
        description={`Postingan yang ditandai dengan tag "${(await params).slug}"`}
        align="left"
      />
      <TagPostList posts={filteredPosts} />
    </section>
  );
}
