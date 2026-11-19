import { Info } from 'lucide-react'
import { cn } from './cn'

export function Disclaimer({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <p className={cn('flex items-start gap-2.5 text-[0.78rem] leading-relaxed text-fg-3', className)}>
      <Info aria-hidden className="mt-0.5 size-3.5 shrink-0" />
      <span>{children ?? 'Educational content only — not investment advice. Options involve substantial risk of loss, including more than the premium for sellers. Outcomes shown are illustrations, never guarantees.'}</span>
    </p>
  )
}
