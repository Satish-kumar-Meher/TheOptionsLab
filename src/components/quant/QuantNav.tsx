import { useEffect, useRef, useState } from 'react'
import { cn } from '@/components/ui'

export const NAV = [
  { id: 'data', label: 'Data' },
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'backtest', label: 'Backtest' },
  { id: 'metrics', label: 'Metrics' },
  { id: 'walk-forward', label: 'Walk-forward' },
  { id: 'monte-carlo', label: 'Monte Carlo' },
  { id: 'regimes', label: 'Regimes' },
  { id: 'algo', label: 'Algo' },
  { id: 'engine', label: 'Engine' },
] as const

export function QuantNav() {
  const [active, setActive] = useState<string>(NAV[0].id)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter((e): e is HTMLElement => !!e)
    const onScroll = () => {
      const probe = window.innerHeight * 0.3
      let cur: string = NAV[0].id
      for (const el of els) if (el.getBoundingClientRect().top <= probe) cur = el.id
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const a = listRef.current?.querySelector<HTMLElement>('[aria-current="true"]')
    const box = listRef.current
    if (a && box) box.scrollTo({ left: a.offsetLeft - box.clientWidth / 2 + a.clientWidth / 2, behavior: 'smooth' })
  }, [active])

  return (
    <nav aria-label="Backtesting Studio sections" className="sticky top-[4.25rem] z-30 border-b border-line bg-bg/80 backdrop-blur-xl">
      <ul ref={listRef} className="container-x flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
        {NAV.map((n, i) => {
          const on = n.id === active
          return (
            <li key={n.id} className="shrink-0">
              <a
                href={`#${n.id}`}
                aria-current={on ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(n.id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
                  history.replaceState(null, '', `#${n.id}`)
                }}
                className={cn('inline-flex h-10 items-center gap-2 rounded-full px-3.5 font-mono text-[0.74rem] uppercase tracking-[0.08em] transition-colors', on ? 'bg-white/[0.09] text-gold' : 'text-fg-2 hover:text-fg')}
              >
                <span className="text-fg-3">{String(i + 1).padStart(2, '0')}</span>
                {n.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
