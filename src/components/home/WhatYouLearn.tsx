import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal, SectionHeader, Tabs } from '../ui'
import { journey, levels } from '@/data/curriculum'

export function WhatYouLearn() {
  const [id, setId] = useState<string>(journey[0].id)
  const stage = journey.find((s) => s.id === id)!
  const lv = levels.filter((l) => l.level >= stage.from && l.level <= stage.to)
  return (
    <section className="section border-t border-line bg-bg-2/40" aria-labelledby="learn-h">
      <div className="container-x">
        <Reveal><SectionHeader eyebrow="What you will learn" title={<span id="learn-h">All 25 levels, one click away.</span>} lead="Pick a stage to see exactly which levels it contains — straight from the curriculum." /></Reveal>
        <Reveal className="mt-10"><Tabs ariaLabel="Learning stage" value={id} onChange={setId} tabs={journey.map((s) => ({ id: s.id, label: s.label }))} /></Reveal>
        <div role="tabpanel" className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {lv.map((l) => (
            <Link key={l.level} to={`/curriculum/${l.level}`} className="group flex gap-4 rounded-2xl border border-line bg-surface/60 p-5 transition-colors hover:border-line-strong hover:bg-surface">
              <span className="num text-[1.9rem] leading-none text-gold-dim transition-colors group-hover:text-gold">{String(l.level).padStart(2, '0')}</span>
              <span className="min-w-0">
                <span className="block font-display text-[1.02rem] font-semibold leading-snug">{l.title}</span>
                <span className="mt-1 block text-[0.8rem] text-fg-3">{l.modules.length} modules · {l.modules.reduce((a, m) => a + m.topics.length, 0)} topics</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
