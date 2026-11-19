import { motion, useReducedMotion } from 'motion/react'
import { cn } from './cn'

export function ProgressBar({ value, className, tone = 'ivory', label }: { value: number; className?: string; tone?: 'ivory' | 'gold'; label?: string }) {
  const reduce = useReducedMotion()
  const pct = Math.max(0, Math.min(1, value))
  return (
    <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct * 100)} className={cn('h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]', className)}>
      <motion.div
        className={cn('h-full rounded-full', tone === 'gold' ? 'bg-gradient-to-r from-gold-dim to-gold' : 'bg-gradient-to-r from-fg-2 to-fg')}
        initial={reduce ? false : { width: 0 }}
        animate={{ width: `${pct * 100}%` }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

export function ProgressRing({ value, size = 56, stroke = 4, children, className }: { value: number; size?: number; stroke?: number; children?: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(1, value))
  return (
    <div className={cn('relative inline-grid place-items-center', className)} style={{ width: size, height: size }} role="img" aria-label={`${Math.round(pct * 100)} percent complete`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#C9A86A" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c}
          initial={reduce ? false : { strokeDashoffset: c }} animate={{ strokeDashoffset: c * (1 - pct) }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
    </div>
  )
}
