import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useGraphicsTier } from './useGraphicsTier'
import { HeroFallback } from './HeroFallback'
import { ErrorBoundary } from '../layout/ErrorBoundary'

const CandleScene = lazy(() => import('./CandleScene'))

/** Full-bleed 3D hero backdrop. Pauses rendering offscreen; falls back to a static SVG when WebGL isn't suitable. */
export function HeroCanvas() {
  const { tier, reduceMotion } = useGraphicsTier()
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.01 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (tier === 'off') return
    const t = setTimeout(() => setReady(true), 350)
    return () => clearTimeout(t)
  }, [tier])
  const fallback = <HeroFallback className="absolute inset-x-0 bottom-0 h-full w-full opacity-80 lg:left-[12%] lg:w-[88%]" />
  return (
    <div ref={ref} className="absolute inset-0">
      <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? 'opacity-0' : 'opacity-100'}`}>{fallback}</div>
      {tier !== 'off' && (
        <ErrorBoundary fallback={fallback} label="hero-3d">
          <Suspense fallback={null}>
            <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}>
              <CandleScene tier={tier} reduceMotion={reduceMotion} visible={visible} />
            </div>
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  )
}
