import { Metadata } from "next"
import { siteMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getPageBySlug } from "@/lib/posts"
import Image from "next/image"
import { Button } from "@/components/ui/Buttons"
import Link from "next/link"

export const metadata: Metadata = {
  ...siteMetadata,
  title: "Tentang",
  description: "Tentang saya",
  alternates: {
    ...siteMetadata.alternates,
    canonical: `${siteMetadata.metadataBase}/about`,
  },
}
export default async function AboutPage() {
  const { data, content } = await getPageBySlug("about")
    return (
      <section className="relative mt-22 mb-14">
        <div className="absolute left-1/2 top-0 h-full border-l border-dashed border-[var(--border)] transform z-0 opacity-20" />
        <Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: data.title, href: "/about" },]}/>
        <div className="flex flex-col md:flex-row h-auto gap-14">
          {data.coverImage && (
            <div>
              <Image
                src={data.coverImage}
                alt={data.title}
                width={120}
                height={120}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 320px"
                priority
                fetchPriority="high"
                className="mb-6 rounded-[var(--radius)] w-full h-auto hover:shadow-lg transition-shadow duration-200"
              />
            </div>
          )}
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
              {data.title}
            </h1>
            <p className="py-6">{data.excerpt}</p>
            <Button 
              variant='outline'
              size="sm">
              <Link href="/contact">
                Kontak
              </Link>
            </Button>
          </div>
        </div>
        <article className="prose">
          <MDXRemote source={content} />
        </article>
      </section>
    )
  }  