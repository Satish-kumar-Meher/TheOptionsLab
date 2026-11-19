import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { CandleMark } from './CandleMark'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
      return () => clearTimeout(t)
    }
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname, hash])
  return null
}

export function PageFallback() {
  return (
    <div className="grid min-h-[70dvh] place-items-center" role="status" aria-label="Loading">
      <motion.div animate={{ opacity: [0.35, 1, 0.35] }} transition={{ duration: 1.6, repeat: Infinity }}><CandleMark className="size-12" /></motion.div>
    </div>
  )
}

export function Layout() {
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  return (
    <>
      <ScrollManager />
      <Navbar />
      <motion.main id="main" key={pathname} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="min-h-[80dvh]">
        <Suspense fallback={<PageFallback />}><Outlet /></Suspense>
      </motion.main>
      <Footer />
    </>
  )
}
