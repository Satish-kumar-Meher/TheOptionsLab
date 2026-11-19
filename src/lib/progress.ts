import { useCallback, useSyncExternalStore } from 'react'

/** Module-completion progress, persisted in THIS BROWSER ONLY (localStorage).
 *  There is no account or backend — the UI says so wherever progress is shown. */
const KEY = 'strikewick.progress.v1'
const listeners = new Set<() => void>()

function load(): string[] {
  try {
    const raw = localStorage.getItem(KEY)
    const parsed = raw ? (JSON.parse(raw) as unknown) : []
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}

let snapshot: readonly string[] = typeof window === 'undefined' ? [] : load()

function commit(next: string[]) {
  snapshot = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    /* storage unavailable (private mode etc.) — progress lives in memory for this tab only */
  }
  listeners.forEach((l) => l())
}

const subscribe = (cb: () => void) => {
  listeners.add(cb)
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      snapshot = load()
      cb()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(cb)
    window.removeEventListener('storage', onStorage)
  }
}
const getSnapshot = () => snapshot

export function useProgress() {
  const done = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const isDone = useCallback((id: string) => done.includes(id), [done])
  const toggle = useCallback((id: string) => {
    commit(snapshot.includes(id) ? snapshot.filter((x) => x !== id) : [...snapshot, id])
  }, [])
  const reset = useCallback(() => commit([]), [])
  return { done, isDone, toggle, reset }
}
