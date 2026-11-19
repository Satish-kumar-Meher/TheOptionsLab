import { useCallback, useEffect, useRef, useState } from 'react'

/** Replay clock: reveals one bar per tick. State changes only on ticks (never per frame). */
export function useReplay(total: number, initial: number, tickMs = 260) {
  const [vis, setVis] = useState(initial)
  const [playing, setPlaying] = useState(false)
  const visRef = useRef(vis)
  visRef.current = vis

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      if (visRef.current >= total) { setPlaying(false); return }
      setVis((v) => Math.min(total, v + 1))
    }, tickMs)
    return () => window.clearInterval(id)
  }, [playing, total, tickMs])

  const toggle = useCallback(() => {
    setPlaying((p) => {
      if (!p && visRef.current >= total) setVis(1)
      return !p
    })
  }, [total])
  const seek = useCallback((n: number) => { setPlaying(false); setVis(Math.max(0, Math.min(total, n))) }, [total])
  const step = useCallback((d: number) => { setPlaying(false); setVis((v) => Math.max(0, Math.min(total, v + d))) }, [total])
  const reset = useCallback((n: number) => { setPlaying(false); setVis(n) }, [])
  return { vis, playing, toggle, seek, step, reset }
}
