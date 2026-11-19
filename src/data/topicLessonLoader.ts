import { useEffect, useState } from 'react'
import type { CurriculumModule } from './curriculum'
import type { ModuleLesson } from './topicLessonTypes'

/** One lazily-loaded chunk per module: src/data/topicLessons/m<LL>_<M>.ts */
const loaders = import.meta.glob<{ default: ModuleLesson }>('./topicLessons/m*.ts')

const key = (id: string) => {
  const [l, m] = id.split('.')
  return `./topicLessons/m${l.padStart(2, '0')}_${m}.ts`
}

export const hasTopicLesson = (id: string) => key(id) in loaders
export const topicLessonCount = () => Object.keys(loaders).length

/** The original curriculum heading for each numbered topic — topic text is never altered. */
export function topicHeadings(m: CurriculumModule): string[] {
  if (m.topics.length) return m.topics
  if (m.id === '3.4') return [...(m.table?.rows.map((r) => r[0]) ?? []), ...(m.checklist?.items ?? [])]
  if (m.table) return m.table.rows.map((r) => r.join(' — '))
  return m.checklist?.items ?? []
}

export type LessonState = { status: 'loading' } | { status: 'none' } | { status: 'ready'; lesson: ModuleLesson }

export function useTopicLesson(id: string): LessonState {
  const [state, setState] = useState<LessonState>(() => (hasTopicLesson(id) ? { status: 'loading' } : { status: 'none' }))
  useEffect(() => {
    let live = true
    const load = loaders[key(id)]
    if (!load) { setState({ status: 'none' }); return }
    setState({ status: 'loading' })
    load().then((mod) => live && setState({ status: 'ready', lesson: mod.default }), () => live && setState({ status: 'none' }))
    return () => { live = false }
  }, [id])
  return state
}
