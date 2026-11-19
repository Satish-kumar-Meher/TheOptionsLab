import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

export function CountUp({ to, duration = 1.6, decimals = 0, prefix = '', suffix = '', className, locale = 'en-IN' }: { to: number; duration?: number; decimals?: number; prefix?: string; suffix?: string; className?: string; locale?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion()
  const [v, setV] = useState(reduce ? to : 0)
  useEffect(() => {
    if (!inView) return
    if (reduce) { setV(to); return }
    const c = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: setV })
    return () => c.stop()
  }, [inView, to, duration, reduce])
  return (
    <span ref={ref} className={className}>
      {prefix}{v.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
    </span>
  )
}
