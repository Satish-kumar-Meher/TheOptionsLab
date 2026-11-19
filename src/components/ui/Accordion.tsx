import { useId, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { cn } from './cn'

export interface AccordionItem {
  id: string
  title: ReactNode
  meta?: ReactNode
  content: ReactNode
}
export function Accordion({ items, defaultOpen = [], multiple = true, className }: { items: AccordionItem[]; defaultOpen?: string[]; multiple?: boolean; className?: string }) {
  const [open, setOpen] = useState<string[]>(defaultOpen)
  const reduce = useReducedMotion()
  const uid = useId()
  const toggle = (id: string) => setOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : multiple ? [...o, id] : [id]))
  return (
    <div className={cn('divide-y divide-line overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface/60', className)}>
      {items.map((it) => {
        const isOpen = open.includes(it.id)
        const pid = `${uid}-${it.id}`
        return (
          <div key={it.id}>
            <h3 className="m-0">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={pid}
                onClick={() => toggle(it.id)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.03] sm:px-6"
              >
                <span className="min-w-0 flex-1">{it.title}</span>
                {it.meta && <span className="shrink-0">{it.meta}</span>}
                <ChevronDown aria-hidden className={cn('size-4 shrink-0 text-fg-2 transition-transform duration-300', isOpen && 'rotate-180')} />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={pid}
                  role="region"
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 sm:px-6">{it.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
