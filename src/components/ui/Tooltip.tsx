import type { ReactNode } from 'react'
import { cn } from './cn'

/** Hover + keyboard-focus tooltip. The trigger is focusable so it works without a mouse. */
export function Tip({ content, children, side = 'top', className }: { content: ReactNode; children: ReactNode; side?: 'top' | 'bottom'; className?: string }) {
  return (
    <span tabIndex={0} className={cn('group/tip relative inline-flex rounded outline-offset-2', className)}>
      {children}
      <span
        role="tooltip"
        className={cn(
          'pointer-events-none absolute left-1/2 z-50 hidden w-max max-w-[min(16rem,calc(100vw-2rem))] -translate-x-1/2 rounded-lg border border-line-strong bg-bg-2/95 px-3 py-2 text-left text-[0.76rem] font-normal normal-case leading-snug tracking-normal text-fg shadow-2xl backdrop-blur-md',
          'group-hover/tip:block group-focus-visible/tip:block group-focus-within/tip:block',
          side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2',
        )}
      >
        {content}
      </span>
    </span>
  )
}
