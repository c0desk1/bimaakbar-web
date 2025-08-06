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
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/favicon.ico",
    },
    openGraph: {
        title: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        siteName: siteConfig.name,
        images: [
        {
            url: "/assets/open-graph.png",
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
        site: siteConfig.twitter,
        creator: siteConfig.twitter,
        images: ["/assets/open-graph.png"],
    },
    manifest: "/site.webmanifest",
    keywords: [siteConfig.name, "Next.js", "Blog", "Web Development"],
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