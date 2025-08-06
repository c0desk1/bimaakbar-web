// components/mdx-components.tsx
import type { MDXComponents } from 'mdx/types'

export const components: MDXComponents = {
  h1: (props) => <h1 className="text-3xl font-bold" {...props} />,
  p: (props) => <p className="leading-relaxed" {...props} />,
}

export function useMDXComponents(): MDXComponents {
  return components
}
