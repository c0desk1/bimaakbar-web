// components/mdx-components.tsx
import type { MDXComponents } from 'mdx/types'
import { Badge } from '@/components/ui/Badge'
import Image from 'next/image'

export const mdxComponents: MDXComponents = {
  img: (props) => (
    <Image
      {...props}
      alt={props.alt ?? ''}
      width={props.width ? Number(props.width) : 800}
      height={props.height ? Number(props.height) : 600}
    />
  ),
  Badge: ({ children }) => <Badge>{children}</Badge>,
}