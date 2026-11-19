import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X, ArrowRight } from 'lucide-react'
import { CandleMark } from './CandleMark'
import { LinkButton } from '../ui'
import { cn } from '../ui/cn'

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/curriculum', label: 'Curriculum' },
  { to: '/labs', label: 'Labs' },
  { to: '/strategies', label: 'Strategies' },
  { to: '/risk', label: 'Risk & Mind' },
  { to: '/quant', label: 'Backtesting' },
  { to: '/roadmap', label: 'Roadmap' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <a href="#main" className="sr-only z-[100] rounded-full bg-fg px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <header className={cn('fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500', scrolled || open ? 'border-b border-line bg-bg/70 backdrop-blur-xl' : 'border-b border-transparent')}>
        <nav aria-label="Primary" className="container-x flex h-[4.25rem] items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Strikewick — home">
            <CandleMark className="size-8" />
            <span className="font-display text-[1.12rem] font-semibold tracking-[-0.03em]">Strike<span className="text-gold">wick</span></span>
          </Link>
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={({ isActive }) => cn('relative rounded-full px-3.5 py-2 text-[0.88rem] transition-colors', isActive ? 'text-fg' : 'text-fg-2 hover:text-fg')}>
                  {({ isActive }) => (
                    <>
                      {l.label}
                      {isActive && <motion.span layoutId="nav-dot" className="absolute inset-x-3.5 -bottom-0.5 h-px bg-gold" />}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <LinkButton to="/learn/1.1" size="sm" className="hidden sm:inline-flex" iconRight={<ArrowRight className="size-3.5" />}>Start learning</LinkButton>
            <button type="button" className="grid size-10 place-items-center rounded-full border border-line-strong lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)}>
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-nav" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-40 overflow-y-auto bg-bg/95 pt-24 backdrop-blur-xl lg:hidden">
            <ul className="container-x flex flex-col">
              {[{ to: '/', label: 'Home' }, ...navLinks].map((l, i) => (
                <motion.li key={l.to} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i, duration: 0.4 }}>
                  <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => cn('flex items-center justify-between border-b border-line py-4 font-display text-2xl', isActive ? 'text-fg' : 'text-fg-2')}>
                    {l.label}<ArrowRight className="size-5 text-fg-3" />
                  </NavLink>
                </motion.li>
              ))}
              <li className="pt-8"><LinkButton to="/learn/1.1" size="lg" className="w-full">Start learning</LinkButton></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
