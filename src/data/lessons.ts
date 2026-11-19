import type { Lesson } from './lessonTypes'
import { lesson34, lesson44 } from './lessons/basics'
import { lesson62, lesson63, lesson64, lesson65 } from './lessons/greeks'
import { lesson73, lesson76, lesson86 } from './lessons/oi'
import { lesson92, lesson192, lesson195 } from './lessons/vol'
import { lesson221, lesson222, lesson245 } from './lessons/risk'

const all: Lesson[] = [lesson34, lesson44, lesson62, lesson63, lesson64, lesson65, lesson73, lesson76, lesson86, lesson92, lesson192, lesson195, lesson221, lesson222, lesson245]

/** Authored deep lessons keyed by curriculum module id. */
export const lessons: Record<string, Lesson> = Object.fromEntries(all.map((l) => [l.moduleId, l]))
