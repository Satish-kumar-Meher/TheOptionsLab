import { useMemo } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

/** Inline / display math. KaTeX output is generated from our own static strings, never from user input. */
export function Tex({ children, block = false, className }: { children: string; block?: boolean; className?: string }) {
  const html = useMemo(() => katex.renderToString(children, { displayMode: block, throwOnError: false, strict: 'ignore' }), [children, block])
  const Tag = block ? 'div' : 'span'
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />
}
