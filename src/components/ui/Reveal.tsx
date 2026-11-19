import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

/** Scroll-triggered reveal. Collapses to a static render for prefers-reduced-motion. */
export function Reveal({ children, delay = 0, y = 22, className, as = 'div' }: { children: ReactNode; delay?: number; y?: number; className?: string; as?: 'div' | 'li' | 'section' | 'article' }) {
  const reduce = useReducedMotion()
  const M = motion[as]
  if (reduce) return <M className={className}>{children}</M>
  return (
    <M className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8% 0px' }} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </M>
  )
}
