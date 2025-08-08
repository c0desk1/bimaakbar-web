import { Metadata } from "next"
import { siteMetadata } from "@/lib/metadata"
import { getPageBySlug } from "@/lib/posts"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

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
  const { content, data } = await getPageBySlug("about")
    return (
      <main className="relative mt-14">
      <div className="absolute left-1/2 top-0 h-full border-l border-dashed border-[var(--border)] transform z-0 opacity-20" />
      <Breadcrumb 
          items={[
            { label: "Beranda", href: "/" },
            { label: data.title, href: "/about" },
          ]}
        />
        <article className="prose">
          <h1>{data.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </main>
    )
  }  