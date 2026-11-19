import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, FlaskConical } from 'lucide-react'
import { Badge, Button, Disclaimer, ProgressBar } from '@/components/ui'
import { Chain, Concepts, Examples, Formulas, Objectives, Pitfalls, Practice, Scenarios, Section } from '@/components/lesson/LessonParts'
import { ModuleBody } from '@/components/curriculum/ModuleCard'
import { counts, getLevelOfModule, getModule, levelBlurbs, levelTools, neighbors } from '@/data/curriculum'
import { lessons } from '@/data/lessons'
import { topicHeadings, useTopicLesson } from '@/data/topicLessonLoader'
import { LangSwitch, loadLang, ModuleTools, saveLang, Steps, TopicCard, type Lang } from '@/components/lesson/TopicLessons'
import { studyMethod } from '@/data/roadmap'
import { useProgress } from '@/lib/progress'

export default function Lesson() {
  const { moduleId = '' } = useParams()
  const { done, isDone, toggle } = useProgress()
  const m = getModule(moduleId)
  const lesson = lessons[moduleId]
  const tl = useTopicLesson(moduleId)
  const ml = tl.status === 'ready' ? tl.lesson : undefined
  const [lang, setLang] = useState<Lang>(loadLang)
  const changeLang = (l: Lang) => { setLang(l); saveLang(l) }
  const L = m ? getLevelOfModule(moduleId) : undefined
  const { prev, next } = neighbors(moduleId)
  const toc = useMemo(() => {
    const extra: string[][] = ml ? [['nine-steps', 'Nine-step lesson'], ['topic-lessons', 'Topic-by-topic lessons'], ...(ml.tools?.length ? [['module-tools', 'Tools for this module']] : [])] : []
    if (!lesson) return [...extra, ['outline', 'Module outline'], ...(ml ? [] : [['method', 'How to study it']]), ['practise', 'Practise']]
    return [['summary', 'Overview'], ['objectives', 'Objectives'], ['concepts', 'Key concepts'], lesson.formulas?.length && ['formulas', 'Formulas'], lesson.examples?.length && ['examples', 'Worked examples'], lesson.scenarios && ['scenarios', 'Three scenarios'], lesson.chain && ['chain', 'Option-chain example'], lesson.pitfalls?.length && ['pitfalls', 'Common mistakes'], ['practice', 'Practice questions'], ['assignment', 'Assignment'], ...extra, ['topics', 'Curriculum topics']].filter(Boolean) as string[][]
  }, [lesson, ml])
  if (!m || !L) return <Navigate to="/curriculum" replace />
  const complete = isDone(m.id)
  const levelDone = L.modules.filter((x) => isDone(x.id)).length
  const tools = levelTools[L.level] ?? []
  const headings = topicHeadings(m)

  const topicBlocks = ml && (
    <>
      <Section id="nine-steps" eyebrow="The nine-step method" title="Concept to assignment"><Steps s={ml.steps} lang={lang} /></Section>
      <Section id="topic-lessons" eyebrow="Every topic explained" title="Topic-by-topic lessons">
        <nav aria-label="Jump to topic" className="mb-6 flex flex-wrap gap-2">{headings.map((_, i) => <a key={i} href={`#topic-${i + 1}`} onClick={(e) => { e.preventDefault(); document.getElementById(`topic-${i + 1}`)?.scrollIntoView({ behavior: 'smooth' }) }} className="num inline-flex size-9 items-center justify-center rounded-full border border-line text-[0.8rem] text-fg-2 transition-colors hover:border-gold/60 hover:text-fg">{i + 1}</a>)}</nav>
        <div className="space-y-6">{headings.map((h, i) => <TopicCard key={i} n={i + 1} heading={h} t={ml.topics.find((x) => x.t === i + 1)} lang={lang} />)}</div>
      </Section>
      {!!ml.tools?.length && <Section id="module-tools" eyebrow="Hands-on" title="Tools for this module"><ModuleTools tools={ml.tools} /></Section>}
    </>
  )

  return (
    <div className="container-x pb-24 pt-28 sm:pt-32">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[0.8rem] text-fg-3">
        <Link to="/curriculum" className="hover:text-fg">Curriculum</Link><span aria-hidden>/</span>
        <Link to={`/curriculum/${L.level}`} className="hover:text-fg">Level {L.level} · {L.title}</Link><span aria-hidden>/</span><span className="num text-fg-2">{m.id}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16.5rem] xl:gap-16">
        <article className="min-w-0">
          <header className="border-b border-line pb-10">
            <div className="flex flex-wrap items-center gap-2"><Badge tone="gold">Module {m.id}</Badge><Badge tone={lesson || ml ? 'bull' : 'neutral'}>{lesson || ml ? 'Full lesson' : 'Curriculum outline'}</Badge>{ml && <Badge tone="ice">{ml.topics.length} topic lessons</Badge>}</div>
            <h1 className="mt-5 max-w-3xl font-display text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1.04]">{m.title}</h1>
            <p id="summary" className="mt-5 max-w-2xl scroll-mt-28 text-[1.1rem] leading-relaxed text-fg-2">{lesson?.summary ?? ml?.intro ?? `${levelBlurbs[L.level]} This module covers ${m.topics.length ? `${m.topics.length} topics` : 'a focused framework'} from Level ${L.level}.`}</p>
            {ml && lang !== 'en' && <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-fg-3">{ml.introHi}</p>}
            {ml && <div className="mt-6 flex flex-wrap items-center gap-3"><LangSwitch lang={lang} onChange={changeLang} /><span className="text-[0.75rem] text-fg-3">Definitions in simple English and Hinglish</span></div>}
            {tl.status === 'loading' && <p className="mt-6 text-[0.85rem] text-fg-3" role="status">Loading detailed lessons…</p>}
          </header>

          <div className="pt-10">
            {lesson ? (
              <>
                <Section id="objectives" eyebrow="What you will be able to do" title="Learning objectives"><Objectives items={lesson.objectives} /></Section>
                <Section id="concepts" eyebrow="Vocabulary" title="Important concepts"><Concepts items={lesson.concepts} /></Section>
                {!!lesson.formulas?.length && <Section id="formulas" eyebrow="The maths" title="Formulas"><Formulas items={lesson.formulas} /></Section>}
                {!!lesson.examples?.length && <Section id="examples" eyebrow="With numbers" title="Worked examples"><Examples items={lesson.examples} /></Section>}
                {lesson.scenarios && <Section id="scenarios" eyebrow="Practical market view" title="Bullish, bearish and sideways"><Scenarios s={lesson.scenarios} /></Section>}
                {lesson.chain && <Section id="chain" eyebrow="Option chain" title="Reading it on a chain"><Chain c={lesson.chain} /></Section>}
                {!!lesson.pitfalls?.length && <Section id="pitfalls" eyebrow="Avoid these" title="Common mistakes"><Pitfalls items={lesson.pitfalls} /></Section>}
                <Section id="practice" eyebrow="Test yourself" title="Practice questions"><Practice items={lesson.practice} /></Section>
                <Section id="assignment" eyebrow="Before the next module" title="Assignment">
                  <div className="rounded-2xl border border-gold/25 bg-gold/[0.06] p-6"><p className="text-[1rem] leading-relaxed text-fg">{lesson.assignment}</p>
                    {lesson.lab && <Link to={lesson.lab.to} className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-fg px-5 text-[0.86rem] font-medium text-bg"><FlaskConical className="size-4" />{lesson.lab.label}</Link>}
                  </div>
                </Section>
                {topicBlocks}
                <Section id="topics" eyebrow="Straight from the curriculum" title={`Module ${m.id} topic list`}><ModuleBody m={m} done={complete} onToggle={() => toggle(m.id)} /></Section>
              </>
            ) : (
              <>
                {topicBlocks}
                <Section id="outline" eyebrow="Straight from the curriculum" title={`Module ${m.id} outline`}><ModuleBody m={m} done={complete} onToggle={() => toggle(m.id)} /></Section>
                {!ml && <Section id="method" eyebrow="Study method" title="Work through it in nine steps">
                  <ol className="grid gap-3 sm:grid-cols-2">{studyMethod.map((s, i) => <li key={s.k} className="flex gap-4 rounded-2xl border border-line bg-surface/50 p-4"><span className="num text-[0.78rem] text-gold">{String(i + 1).padStart(2, '0')}</span><span><span className="block font-medium text-fg">{s.k}</span><span className="text-[0.86rem] leading-snug text-fg-2">{s.v}</span></span></li>)}</ol>
                </Section>}
                <Section id="practise" eyebrow="Hands-on" title="Practise it">
                  {tools.length ? <ul className="grid gap-3 sm:grid-cols-2">{tools.map((t) => <li key={t.to}><Link to={t.to} className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface/60 p-5 text-[0.95rem] text-fg transition-colors hover:border-line-strong"><span className="flex items-center gap-3"><FlaskConical className="size-4 text-gold" />{t.label}</span><ArrowRight className="size-4 text-fg-3" /></Link></li>)}</ul> : <p className="text-[0.95rem] leading-relaxed text-fg-2">Take each topic above and write one sentence on how it would change your reading of an option chain. If you cannot, revisit the module before moving on — and note it in your <Link to="/risk#journal" className="text-fg underline underline-offset-4">trade journal</Link>.</p>}
                </Section>
              </>
            )}
          </div>

          <nav aria-label="Lesson navigation" className="mt-14 grid gap-3 sm:grid-cols-2">
            {prev ? <Link to={`/learn/${prev.id}`} className="group flex items-center gap-4 rounded-2xl border border-line p-5 transition-colors hover:border-line-strong"><ArrowLeft className="size-4 text-fg-3 transition-transform group-hover:-translate-x-1" /><span><span className="block font-mono text-[0.66rem] uppercase tracking-[0.12em] text-fg-3">Previous · {prev.id}</span><span className="block text-[0.95rem] text-fg">{prev.title}</span></span></Link> : <span />}
            {next && <Link to={`/learn/${next.id}`} className="group flex items-center justify-end gap-4 rounded-2xl border border-line p-5 text-right transition-colors hover:border-line-strong"><span><span className="block font-mono text-[0.66rem] uppercase tracking-[0.12em] text-fg-3">Next · {next.id}</span><span className="block text-[0.95rem] text-fg">{next.title}</span></span><ArrowRight className="size-4 text-fg-3 transition-transform group-hover:translate-x-1" /></Link>}
          </nav>
          <Disclaimer className="mt-10" />
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="glass-solid space-y-5 p-5">
            <Button variant={complete ? 'secondary' : 'primary'} className="w-full" aria-pressed={complete} onClick={() => toggle(m.id)} icon={<Check className="size-4" />}>{complete ? 'Completed — undo' : 'Mark module complete'}</Button>
            <div><div className="mb-2 flex justify-between text-[0.78rem] text-fg-2"><span>Level {L.level}</span><span className="num">{levelDone}/{L.modules.length}</span></div><ProgressBar value={levelDone / L.modules.length} tone="gold" label="Level progress" /><p className="mt-2 text-[0.7rem] text-fg-3">{done.length}/{counts.modules} overall · saved in this browser</p></div>
            <nav aria-label="On this page" className="border-t border-line pt-4"><p className="mb-3 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-fg-3">On this page</p><ul className="space-y-1.5">{toc.map(([id, label]) => <li key={id}><a href={`#${id}`} onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }} className="block text-[0.84rem] text-fg-2 transition-colors hover:text-fg">{label}</a></li>)}</ul></nav>
            <div className="border-t border-line pt-4"><p className="mb-3 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-fg-3">Modules in Level {L.level}</p><ul className="space-y-1">{L.modules.map((x) => <li key={x.id}><Link to={`/learn/${x.id}`} aria-current={x.id === m.id ? 'page' : undefined} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[0.8rem] transition-colors ${x.id === m.id ? 'bg-white/[0.07] text-fg' : 'text-fg-2 hover:text-fg'}`}><span className="num w-9 shrink-0 text-gold">{x.id}</span><span className="truncate">{x.title}</span>{isDone(x.id) && <Check className="ml-auto size-3 shrink-0 text-gold" strokeWidth={3} />}</Link></li>)}</ul></div>
          </div>
        </aside>
      </div>
    </div>
  )
}
