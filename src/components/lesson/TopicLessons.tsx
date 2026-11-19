import { lazy, Suspense, useState } from 'react'
import { Calculator, Lightbulb } from 'lucide-react'
import { Badge, Segmented, cn } from '@/components/ui'
import { Visual } from './Visual'
import type { CalcRef, ModuleLesson, NineSteps, TopicLesson } from '@/data/topicLessonTypes'
import { studyMethod } from '@/data/roadmap'

export type Lang = 'en' | 'hi' | 'both'
const LANG_KEY = 'strikewick.lang.v1'

export function loadLang(): Lang {
  try { const v = localStorage.getItem(LANG_KEY); if (v === 'en' || v === 'hi' || v === 'both') return v } catch { /* storage unavailable */ }
  return 'both'
}
export function saveLang(l: Lang) { try { localStorage.setItem(LANG_KEY, l) } catch { /* storage unavailable */ } }

/** Calculators are code-split: the registry only loads when a learner opens one. */
const CalcPanel = lazy(() => import('@/components/calc/registry').then((m) => ({ default: m.CalcPanel })))

export function LangSwitch({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  return (
    <Segmented<Lang> ariaLabel="Lesson language" value={lang} onChange={onChange} options={[{ value: 'en', label: 'English' }, { value: 'hi', label: 'Hinglish' }, { value: 'both', label: 'Both' }]} />
  )
}

function Calc({ calc, label = 'Open calculator' }: { calc: CalcRef; label?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-5">
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-gold/35 bg-gold/[0.07] px-4 text-[0.84rem] font-medium text-fg transition-colors hover:border-gold/60">
        <Calculator className="size-4 text-gold" aria-hidden />{open ? 'Hide calculator' : label}
      </button>
      {open && <div className="mt-4"><Suspense fallback={<p className="text-[0.85rem] text-fg-3">Loading calculator…</p>}><CalcPanel id={calc.id} preset={calc.preset} why={calc.why} compact /></Suspense></div>}
    </div>
  )
}

function Para({ label, children, tone }: { label: string; children: string; tone?: 'gold' }) {
  return (
    <div>
      <p className={cn('font-mono text-[0.66rem] uppercase tracking-[0.12em]', tone === 'gold' ? 'text-gold' : 'text-fg-3')}>{label}</p>
      <p className="mt-1.5 text-[0.97rem] leading-[1.7] text-fg-2">{children}</p>
    </div>
  )
}

export function TopicCard({ n, heading, t, lang }: { n: number; heading: string; t?: TopicLesson; lang: Lang }) {
  return (
    <article id={`topic-${n}`} aria-labelledby={`topic-${n}-h`} className="scroll-mt-28 rounded-3xl border border-line bg-surface/40 p-5 sm:p-8">
      <header className="flex items-start gap-4">
        <span className="num mt-1 text-[1.6rem] font-semibold leading-none text-gold">{String(n).padStart(2, '0')}</span>
        <h3 id={`topic-${n}-h`} className="font-display text-[1.22rem] font-semibold leading-snug text-fg sm:text-[1.4rem]">{heading}</h3>
      </header>
      {!t ? (
        <p className="mt-5 text-[0.92rem] text-fg-3">A detailed explanation for this topic is being written.</p>
      ) : (
        <div className="mt-6 space-y-6">
          {lang !== 'hi' && <Para label="Definition" tone="gold">{t.def}</Para>}
          {lang !== 'en' && <Para label="Hinglish mein samjho" tone="gold">{t.hi}</Para>}
          <Para label="How it works">{t.how}</Para>
          <div className="rounded-2xl border border-line-strong/60 bg-bg-2/70 p-5">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-ice">Real-market example · {t.eg.title}</p>
            <p className="mt-2 whitespace-pre-line text-[0.95rem] leading-[1.7] text-fg">{t.eg.text}</p>
          </div>
          {t.visual && <Visual spec={t.visual} />}
          <div className="flex gap-3 rounded-2xl border border-gold/25 bg-gold/[0.06] p-4">
            <Lightbulb className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
            <p className="text-[0.92rem] leading-relaxed text-fg"><span className="font-medium">Key takeaway · </span>{t.tip}</p>
          </div>
          {t.calc && <Calc calc={t.calc} />}
        </div>
      )}
    </article>
  )
}

export function Steps({ s, lang }: { s: NineSteps; lang: Lang }) {
  const item = (i: number, body: React.ReactNode) => (
    <li key={i} className="rounded-2xl border border-line bg-surface/50 p-5 sm:p-6">
      <div className="flex items-baseline gap-3"><span className="num text-[0.8rem] text-gold">{String(i + 1).padStart(2, '0')}</span><h3 className="font-display text-[1.1rem] font-semibold text-fg">{studyMethod[i]?.k}</h3></div>
      <div className="mt-3 space-y-3 text-[0.95rem] leading-[1.7] text-fg-2">{body}</div>
    </li>
  )
  return (
    <ol className="space-y-4">
      {item(0, <>{lang !== 'hi' && <p>{s.concept}</p>}{lang !== 'en' && <p className="text-fg">{s.conceptHi}</p>}</>)}
      {item(1, <p>{s.mechanism}</p>)}
      {item(2, <><p className="font-medium text-fg">{s.example.title}</p><p className="whitespace-pre-line">{s.example.text}</p></>)}
      {item(3, <Visual spec={s.chart} />)}
      {item(4, <p>{s.optionChain}</p>)}
      {item(5, <p>{s.psychology}</p>)}
      {item(6, <div className="grid gap-3 sm:grid-cols-3">
        {([['Bullish', s.scenarios.bullish, 'bull'], ['Bearish', s.scenarios.bearish, 'bear'], ['Sideways', s.scenarios.sideways, 'ice']] as const).map(([h, b, tone]) => (
          <div key={h} className="rounded-xl border border-line bg-bg-2/60 p-4"><Badge tone={tone}>{h === 'Bullish' ? '▲ ' : h === 'Bearish' ? '▼ ' : '◆ '}{h}</Badge><p className="mt-2 text-[0.88rem] leading-relaxed">{b}</p></div>
        ))}
      </div>)}
      {item(7, <ul className="space-y-3">{s.practice.map((p) => (
        <li key={p.q}><details className="group rounded-xl border border-line bg-bg-2/50 p-4"><summary className="cursor-pointer list-none text-[0.95rem] font-medium text-fg marker:hidden">{p.q}</summary><p className="mt-3 whitespace-pre-line border-t border-line pt-3 text-[0.9rem]">{p.a}</p></details></li>
      ))}</ul>)}
      {item(8, <p className="rounded-xl border border-gold/25 bg-gold/[0.06] p-4 text-fg">{s.assignment}</p>)}
    </ol>
  )
}

export function ModuleTools({ tools }: { tools: CalcRef[] }) {
  return <div className="space-y-2">{tools.map((c, i) => <Calc key={`${c.id}${i}`} calc={c} label={`Open tool: ${c.why ?? c.id}`} />)}</div>
}

export type { ModuleLesson }
