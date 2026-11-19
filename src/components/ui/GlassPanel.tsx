import type { HTMLAttributes } from 'react'
import { cn } from './cn'

interface Props extends HTMLAttributes<HTMLDivElement> {
  /** 'glass' = translucent blur (use sparingly, over imagery); 'solid' = opaque surface for dense content. */
  variant?: 'glass' | 'solid'
  /** Market-direction tint ONLY. Never use for decoration. */
  tone?: 'bull' | 'bear' | 'none'
  padded?: boolean
}
export function GlassPanel({ variant = 'solid', tone = 'none', padded = true, className, ...rest }: Props) {
  return (
    <div
      className={cn(variant === 'glass' ? 'glass' : 'glass-solid', tone === 'bull' && 'glow-bull', tone === 'bear' && 'glow-bear', padded && 'p-5 sm:p-6', className)}
      {...rest}
    />
  )
}
