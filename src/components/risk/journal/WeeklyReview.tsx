import { useState } from 'react'
import { Check } from 'lucide-react'
import type { Stats } from '@/lib/journal'

const PROMPTS = [
  'Which trades followed my written plan, and which did not? What was different on the second group?',
  'Which mistake tag appeared most this week, and what one rule would have prevented it?',
  'Did I check India VIX and the OI picture before each entry, or only after?',
  'Which single setup deserves fewer trades next week, and which deserves a closer look?',
  'Were my losses within the size I decided on before entering? If not, why not?',
  'What did I do well that I want to repeat, regardless of the outcome?',
  'Do I feel calm, or am I trying to win back a loss? If the latter, what is my cooling-off rule?',
  'Write one concrete change for next week. Keep it small enough to measure.',
]

export function WeeklyReview({ stats }: { stats: Stats }) {
  const [done, setDone] = useState<Set<number>>(new Set())
  const toggle = (i: number) => setDone((s) => { const n = new Set(s); if (n.has(i)) n.delete(i); else n.add(i); return n })
  const top = stats.mistakes.filter((m) => m.mistake !== 'none' && m.count > 0).sort((a, b) => b.count - a.count)[0]
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
      <div>
        <span className="eyebrow">Module 25.4 · Continuous improvement</span>
        <h3 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.1rem)] font-semibold leading-tight text-fg">A weekly review beats a bigger win</h3>
        <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-fg-2">Set aside twenty minutes at the weekend. Read your entries for the week, then answer the prompts in writing. The aim is a better process, not a better week.</p>
        {top && <p className="mt-4 border-l-2 border-gold pl-4 text-[0.88rem] leading-relaxed text-fg-2">Your most frequent tag so far is <span className="text-fg">{top.mistake}</span> ({top.count} trade{top.count === 1 ? '' : 's'}). Start there.</p>}
      </div>
      <ol className="flex flex-col" aria-label="Weekly review prompts. Tick each one as you answer it.">
        {PROMPTS.map((p, i) => {
          const on = done.has(i)
          return (
            <li key={p} className="border-t border-line last:border-b">
              <button type="button" onClick={() => toggle(i)} aria-pressed={on} className="flex min-h-12 w-full items-start gap-4 py-3.5 text-left">
                <span className="num mt-0.5 w-6 shrink-0 text-[0.8rem] text-gold">{String(i + 1).padStart(2, '0')}</span>
                <span className={`flex-1 text-[0.92rem] leading-relaxed ${on ? 'text-fg-3 line-through' : 'text-fg'}`}>{p}</span>
                <span aria-hidden className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border ${on ? 'border-gold bg-gold text-bg' : 'border-line-strong'}`}>{on && <Check className="size-3" />}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
