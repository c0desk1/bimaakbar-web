// src/lib/metadata.ts
import type { Metadata } from "next"
import { siteConfig } from "@/config"

export const siteMetadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`
    },
    description: siteConfig.description,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
        title: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        siteName: siteConfig.name,
        images: [
            {
                url: `${siteConfig.url}/assets/open-graph.png`,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
        locale: "id_ID",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        site: siteConfig.twitter,
        creator: siteConfig.twitter,
        images: [`${siteConfig.url}/assets/open-graph.png`],
    },
verification: {
google: 'kho65u9v63Iyq-j3KpnIKChy0yh_vVLZhzCrBDpnVVs',
yandex: '0750847de0e7aa96',
},
    manifest: "/site.webmanifest",
    keywords: [siteConfig.name, "Next.js", "Blog", "FL Studio", "Music", "Web Development"],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
}
