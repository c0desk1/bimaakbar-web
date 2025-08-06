import createMDX from '@next/mdx'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    formats: ['image/webp', 'image/avif'],
  },
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, {
        behavior: 'append',
        properties: {
          className: ['anchor'],
          ariaHidden: 'true',
        },
        content: {
          type: 'element',
          tagName: 'svg',
          properties: {
            className: ['anchor-icon'],
            viewBox: '0 0 16 16',
            fill: 'currentColor',
            width: '16',
            height: '16',
          },
          children: [
            {
              type: 'element',
              tagName: 'path',
              properties: {
                d: 'M7.775 3.275a.75.75 0 0 1 1.06 0l3.89 3.89a.75.75 0 0 1 0 1.06l-3.89 3.89a.75.75 0 0 1-1.06-1.06L10.44 8 7.775 5.335a.75.75 0 0 1 0-1.06z',
              },
              children: [],
            },
          ],
        },
      }],
    ],
  },
})

export default withMDX(nextConfig)
