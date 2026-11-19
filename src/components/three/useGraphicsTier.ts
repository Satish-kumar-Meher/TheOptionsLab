import { useEffect, useState } from 'react'

export type Tier = 'off' | 'low' | 'high'

interface NavigatorExt extends Navigator { deviceMemory?: number; connection?: { saveData?: boolean } }

function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/** Decide how much 3D to run. 'off' = static SVG, 'low' = no post-processing / reflections, 'high' = everything.
 *  Computed after mount (needs window); starts at 'off' so SSR / first paint is the lightweight static fallback. */
export function useGraphicsTier(): { tier: Tier; reduceMotion: boolean } {
  const [state, setState] = useState<{ tier: Tier; reduceMotion: boolean }>({ tier: 'off', reduceMotion: false })
  useEffect(() => {
    const nav = navigator as NavigatorExt
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!webglAvailable() || nav.connection?.saveData) return setState({ tier: 'off', reduceMotion })
    const small = window.innerWidth < 768
    const weak = (nav.hardwareConcurrency ?? 4) <= 4 || (nav.deviceMemory ?? 8) <= 4
    setState({ tier: small || weak ? 'low' : 'high', reduceMotion })
  }, [])
  return state
}
