import { HERO_CANDLES, BULL, BEAR } from './heroData'

/** Static glass-candle illustration: used while WebGL loads, on devices that can't run it, and under save-data. */
export function HeroFallback({ className }: { className?: string }) {
  const W = 860, H = 560, step = 54, base = 470, k = 62
  const x0 = 60
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-label="Illustration of red and green glass candlesticks trending upward" preserveAspectRatio="xMidYMax meet">
      <defs>
        {(['g', 'r'] as const).map((id) => {
          const c = id === 'g' ? BULL : BEAR
          const d = id === 'g' ? '#052a1c' : '#33070c'
          return (
            <linearGradient key={id} id={`body-${id}`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor={d} /><stop offset="0.3" stopColor={c} stopOpacity="0.55" /><stop offset="0.55" stopColor={d} /><stop offset="1" stopColor={c} stopOpacity="0.25" />
            </linearGradient>
          )
        })}
        <linearGradient id="floor" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#c9a86a" stopOpacity="0.18" /><stop offset="1" stopColor="#c9a86a" stopOpacity="0" /></linearGradient>
      </defs>
      <rect x="0" y={base} width={W} height={H - base} fill="url(#floor)" />
      {HERO_CANDLES.map((c, i) => {
        const bull = c.c >= c.o
        const col = bull ? BULL : BEAR
        const x = x0 + i * step
        const yTop = base - Math.max(c.o, c.c) * k
        const yBot = base - Math.min(c.o, c.c) * k
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={base - c.h * k} y2={base - c.l * k} stroke={col} strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />
            <rect x={x - 14} y={yTop} width="28" height={Math.max(yBot - yTop, 18)} rx="6" fill={`url(#body-${bull ? 'g' : 'r'})`} stroke={col} strokeOpacity="0.7" strokeWidth="1.3" />
          </g>
        )
      })}
    </svg>
  )
}
