import { useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Search, X } from 'lucide-react'
import { Accordion, Badge, PageHeader, ProgressBar, ProgressRing, Reveal, Disclaimer } from '@/components/ui'
import { ModuleBody, ModuleHeader, ModuleMeta } from '@/components/curriculum/ModuleCard'
import { LevelSidebar, levelStatus } from '@/components/curriculum/LevelSidebar'
import { allModules, counts, getLevel, levelBlurbs, levelTools, levelTopicCount, levels, stageOfLevel } from '@/data/curriculum'
import { useProgress } from '@/lib/progress'

interface Hit { id: string; level: number; module: string; topic: string }

export default function Curriculum() {
  const { level: lp } = useParams()
  const navigate = useNavigate()
  const { done, isDone, toggle, reset } = useProgress()
  const [q, setQ] = useState('')
  const n = lp === undefined ? 1 : Number(lp)
  const level = Number.isInteger(n) ? getLevel(n) : undefined
  const query = q.trim().toLowerCase()

  const hits = useMemo<Hit[]>(() => {
    if (query.length < 2) return []
    const out: Hit[] = []
    for (const m of allModules) {
      if (m.title.toLowerCase().includes(query)) out.push({ id: `${m.id}-t`, level: m.level, module: m.id, topic: m.title })
      m.topics.forEach((t, i) => { if (t.toLowerCase().includes(query)) out.push({ id: `${m.id}-${i}`, level: m.level, module: m.id, topic: t }) })
      if (out.length > 120) break
    }
    return out
  }, [query])

  if (lp !== undefined && !level) return <Navigate to="/curriculum" replace />
  const L = level ?? levels[0]
  const st = levelStatus(L.level, done)
  const overall = done.length / counts.modules
  const tools = levelTools[L.level] ?? []
  const stage = stageOfLevel(L.level)
  const prev = getLevel(L.level - 1), next = getLevel(L.level + 1)
  const firstOpen = L.modules.find((m) => !isDone(m.id)) ?? L.modules[0]

  return (
    <>
      <PageHeader eyebrow="Complete curriculum" title="25 levels. One connected path." description="Every module and every topic from the master curriculum, organised by level. Open a level, expand a module, and mark it complete as you go.">
        <div className="relative max-w-xl">
          <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-fg-3" />
          <label htmlFor="cur-search" className="sr-only">Search all topics</label>
          <input id="cur-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${counts.topics.toLocaleString('en-IN')} topics — try “gamma”, “PCR”, “stop-loss”`} className="h-12 w-full rounded-full border border-line-strong bg-white/[0.04] pl-11 pr-11 text-[0.94rem] text-fg backdrop-blur-md outline-none transition-colors placeholder:text-fg-3 focus:border-gold/60" />
          {q && <button type="button" aria-label="Clear search" onClick={() => setQ('')} className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-fg-2 hover:bg-white/10 hover:text-fg"><X className="size-4" /></button>}
        </div>
      </PageHeader>

      <div className="container-x grid gap-10 py-10 lg:grid-cols-[15.5rem_minmax(0,1fr)] xl:grid-cols-[15.5rem_minmax(0,1fr)_17rem]">
        {/* mobile level picker */}
        <div className="lg:hidden">
          <label htmlFor="lvl-pick" className="mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-fg-3">Jump to level</label>
          <select id="lvl-pick" value={L.level} onChange={(e) => navigate(`/curriculum/${e.target.value}`)} className="h-12 w-full rounded-xl border border-line-strong bg-surface px-4 text-[0.95rem] text-fg">
            {levels.map((l) => <option key={l.level} value={l.level}>{`Level ${l.level} — ${l.title}`}</option>)}
          </select>
        </div>
        <aside className="hidden lg:block"><div className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto pb-6 pr-1"><LevelSidebar active={L.level} done={done} /></div></aside>

        <div className="min-w-0">
          {query.length >= 2 ? (
            <section aria-live="polite" aria-label="Search results">
              <p className="mb-5 text-[0.9rem] text-fg-2">{hits.length ? `${hits.length >= 120 ? '120+' : hits.length} matches for “${q}”` : `No topics match “${q}”.`}</p>
              <ul className="divide-y divide-line overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface/50">
                {hits.map((h) => (
                  <li key={h.id}><Link to={`/learn/${h.module}`} className="flex items-start gap-4 px-5 py-3.5 transition-colors hover:bg-white/[0.04]"><span className="num w-12 shrink-0 text-[0.78rem] text-gold">{h.module}</span><span className="min-w-0 flex-1 text-[0.92rem] text-fg">{h.topic}</span><span className="hidden text-[0.74rem] text-fg-3 sm:block">Level {h.level}</span></Link></li>
                ))}
              </ul>
            </section>
          ) : (
            <Reveal key={L.level}>
              <header className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-line bg-surface/60 p-6 sm:p-9">
                <span aria-hidden className="num pointer-events-none absolute -right-2 -top-6 select-none text-[9rem] leading-none text-white/[0.035] sm:text-[12rem]">{String(L.level).padStart(2, '0')}</span>
                <div className="relative flex flex-wrap items-center gap-2">
                  <Badge tone="gold">Level {L.level}</Badge><Badge>{stage.label}</Badge>
                  <Badge tone={st.state === 'Completed' ? 'bull' : 'neutral'} className="ml-auto">{st.state}</Badge>
                </div>
                <h2 className="relative mt-5 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.05]">{L.title}</h2>
                {L.subtitle && <p className="relative mt-2 font-mono text-[0.74rem] uppercase tracking-[0.1em] text-gold">{L.subtitle}</p>}
                <p className="relative mt-4 max-w-2xl text-[1rem] leading-relaxed text-fg-2">{levelBlurbs[L.level]}</p>
                <div className="relative mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.82rem] text-fg-3"><span><span className="num text-fg">{L.modules.length}</span> modules</span><span><span className="num text-fg">{levelTopicCount(L)}</span> topics</span><span>PDF Part {L.part}: {L.partTitle}</span></div>
                <Link to={`/learn/${firstOpen.id}`} className="relative mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-fg px-6 text-[0.9rem] font-medium text-bg transition-transform hover:-translate-y-0.5">{st.n ? 'Continue' : 'Start'} with {firstOpen.id}<ArrowRight className="size-4" /></Link>
              </header>

              <div className="mt-4 flex items-center gap-4 rounded-2xl border border-line bg-surface/50 px-5 py-3.5 xl:hidden">
                <span className="num text-[0.82rem] text-fg">{st.n}/{st.total}</span>
                <ProgressBar value={st.n / st.total} tone="gold" label="Level progress" className="flex-1" />
                <span className="text-[0.74rem] text-fg-3">saved in this browser</span>
              </div>

              <div className="mt-6">
                <Accordion key={L.level} defaultOpen={[L.modules[0].id]} items={L.modules.map((m) => ({ id: m.id, title: <ModuleHeader m={m} done={isDone(m.id)} />, meta: <ModuleMeta m={m} />, content: <ModuleBody m={m} done={isDone(m.id)} onToggle={() => toggle(m.id)} /> }))} />
              </div>

              <nav aria-label="Level navigation" className="mt-8 grid gap-3 sm:grid-cols-2">
                {prev ? <Link to={`/curriculum/${prev.level}`} className="group flex items-center gap-4 rounded-2xl border border-line p-5 transition-colors hover:border-line-strong"><ArrowLeft className="size-4 text-fg-3 transition-transform group-hover:-translate-x-1" /><span><span className="block font-mono text-[0.66rem] uppercase tracking-[0.12em] text-fg-3">Previous · Level {prev.level}</span><span className="block text-[0.95rem] text-fg">{prev.title}</span></span></Link> : <span />}
                {next && <Link to={`/curriculum/${next.level}`} className="group flex items-center justify-end gap-4 rounded-2xl border border-line p-5 text-right transition-colors hover:border-line-strong"><span><span className="block font-mono text-[0.66rem] uppercase tracking-[0.12em] text-fg-3">Next · Level {next.level}</span><span className="block text-[0.95rem] text-fg">{next.title}</span></span><ArrowRight className="size-4 text-fg-3 transition-transform group-hover:translate-x-1" /></Link>}
              </nav>
            </Reveal>
          )}
        </div>

        <aside className="hidden xl:block">
          <div className="sticky top-24 space-y-4">
            <div className="glass-solid p-5">
              <div className="flex items-center gap-4">
                <ProgressRing value={st.n / st.total} size={64}><span className="num text-[0.82rem]">{st.n}/{st.total}</span></ProgressRing>
                <div><p className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-fg-3">This level</p><p className="text-[0.92rem] text-fg">{st.state}</p></div>
              </div>
              <div className="mt-5 border-t border-line pt-4"><div className="mb-2 flex justify-between text-[0.78rem] text-fg-2"><span>Whole curriculum</span><span className="num">{done.length}/{counts.modules}</span></div><ProgressBar value={overall} tone="gold" label="Overall progress" /></div>
              <p className="mt-4 text-[0.72rem] leading-snug text-fg-3">Progress is saved in this browser only.</p>
              {done.length > 0 && <button type="button" onClick={() => { if (window.confirm('Reset all progress in this browser?')) reset() }} className="mt-2 text-[0.74rem] text-fg-3 underline-offset-4 hover:text-fg hover:underline">Reset progress</button>}
            </div>
            {tools.length > 0 && (
              <div className="glass-solid p-5">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-gold">Practise this level</p>
                <ul className="mt-3 space-y-2">{tools.map((t) => <li key={t.to}><Link to={t.to} className="flex items-center justify-between gap-2 text-[0.86rem] text-fg-2 transition-colors hover:text-fg">{t.label}<ArrowRight className="size-3.5 shrink-0" /></Link></li>)}</ul>
              </div>
            )}
            <Disclaimer className="px-1" />
          </div>
        </aside>
      </div>
    </>
  )
}
