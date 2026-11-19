import type { ReactNode } from 'react'

/** Header for inner pages. A faint wick-and-tick ruler on the right ties every page to the candle identity. */
export function PageHeader({ eyebrow, title, description, children }: { eyebrow: string; title: ReactNode; description?: ReactNode; children?: ReactNode }) {
  return (
    <header className="relative isolate overflow-hidden border-b border-line">
      <div className="market-grid -z-10 opacity-60" aria-hidden />
      <div aria-hidden className="pointer-events-none absolute -right-6 top-0 -z-10 hidden h-full w-72 opacity-50 md:block">
        <svg viewBox="0 0 280 260" className="h-full w-full" fill="none">
          {[[30, 150, 60, 'bear'], [78, 120, 80, 'bull'], [126, 100, 50, 'bear'], [174, 60, 96, 'bull'], [222, 40, 70, 'bull']].map(([x, y, h, k], i) => {
            const c = k === 'bull' ? '#00E58A' : '#F04444'
            return (
              <g key={i} opacity={0.35 + i * 0.1}>
                <path d={`M${x} ${Number(y) - 22}V${Number(y) + Number(h) + 26}`} stroke={c} strokeWidth="1.4" strokeLinecap="round" />
                <rect x={Number(x) - 11} y={y as number} width="22" height={h as number} rx="4" stroke={c} strokeWidth="1.2" fill={c} fillOpacity="0.12" />
              </g>
            )
          })}
        </svg>
      </div>
      <div className="container-x pb-12 pt-32 sm:pb-16 sm:pt-40">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.2rem,5.2vw,4.1rem)] font-semibold leading-[1.02] text-fg">{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-fg-2">{description}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  )
}
