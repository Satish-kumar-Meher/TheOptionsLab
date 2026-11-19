import type { ReactNode } from 'react'
import { cn } from './cn'
import { SimulatedBadge } from './Badge'

/** Frame for any chart: title, subtitle, optional controls slot, and a fixed-height body for ResponsiveContainer. */
export function ChartContainer({ title, subtitle, simulated = true, actions, height = 320, children, className, footer }: { title: ReactNode; subtitle?: ReactNode; simulated?: boolean; actions?: ReactNode; height?: number; children: ReactNode; className?: string; footer?: ReactNode }) {
  return (
    <figure className={cn('glass-solid m-0 flex flex-col gap-4 p-5 sm:p-6', className)}>
      <figcaption className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="text-[1.02rem] font-semibold text-fg">{title}</h3>
            {simulated && <SimulatedBadge />}
          </div>
          {subtitle && <p className="mt-1 max-w-prose text-[0.84rem] leading-relaxed text-fg-2">{subtitle}</p>}
        </div>
        {actions}
      </figcaption>
      <div style={{ height }} className="relative min-w-0">{children}</div>
      {footer && <div className="text-[0.8rem] leading-relaxed text-fg-2">{footer}</div>}
    </figure>
  )
}
