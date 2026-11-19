import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Download, FlaskConical, Pencil, Trash2 } from 'lucide-react'
import { Badge, Button, DataTable, Reveal, SectionHeader, type Column } from '@/components/ui'
import { fmtIN } from '@/lib/format'
import {
  MISTAKES, loadTrades, makeSampleTrades, newId, quantity, saveTrades, sortTrades, tradePnl, tradeToDraft, tradesToCsv, computeStats,
  type Trade,
} from '@/lib/journal'
import { EntryForm, blankDraft } from './journal/EntryForm'
import { Performance, Pnl } from './journal/Performance'
import { WeeklyReview } from './journal/WeeklyReview'
import { SelectField } from './journal/fields'

type NewTrade = Omit<Trade, 'id' | 'sample'>

const fmtWhen = (dt: string): string => {
  const [d, t] = dt.split('T')
  const [y, m, day] = d.split('-').map(Number)
  const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][m - 1]
  return `${String(day).padStart(2, '0')} ${mon} ${y} · ${t}`
}
const contract = (t: Trade): string => (t.type === 'FUT' ? `${t.instrument} FUT` : `${t.instrument} ${fmtIN(t.strike)} ${t.type}`)

export function JournalSection() {
  const [init] = useState(() => loadTrades())
  const [trades, setTrades] = useState<Trade[]>(init.trades)
  const [storageOk, setStorageOk] = useState(init.available)
  const [editing, setEditing] = useState<Trade | null>(null)
  const [formKey, setFormKey] = useState(0)
  const [fSetup, setFSetup] = useState('all')
  const [fMistake, setFMistake] = useState('all')
  const [confirmClear, setConfirmClear] = useState(false)
  const [status, setStatus] = useState(init.dropped > 0 ? `${init.dropped} unreadable saved entr${init.dropped === 1 ? 'y was' : 'ies were'} skipped.` : '')
  const formRef = useRef<HTMLDivElement>(null)

  const commit = useCallback((next: Trade[], msg: string) => {
    setTrades(next)
    setStorageOk(saveTrades(next))
    setStatus(msg)
  }, [])

  useEffect(() => { if (!confirmClear) return; const t = window.setTimeout(() => setConfirmClear(false), 8000); return () => window.clearTimeout(t) }, [confirmClear])

  const stats = useMemo(() => computeStats(trades), [trades])
  const setups = useMemo(() => [...new Set(trades.map((t) => t.setup).filter((s) => s !== ''))].sort(), [trades])
  const sampleCount = trades.filter((t) => t.sample).length
  const shown = useMemo(
    () => sortTrades(trades).reverse().filter((t) => (fSetup === 'all' || (fSetup === '__none' ? t.setup === '' : t.setup === fSetup)) && (fMistake === 'all' || t.mistake === fMistake)),
    [trades, fSetup, fMistake],
  )
  const filtered = fSetup !== 'all' || fMistake !== 'all'
  // The filter's own selection may vanish after a delete; fall back to showing everything.
  useEffect(() => { if (fSetup !== 'all' && fSetup !== '__none' && !setups.includes(fSetup)) setFSetup('all') }, [setups, fSetup])

  const submit = (t: NewTrade) => {
    if (editing) {
      commit(trades.map((x) => (x.id === editing.id ? { ...t, id: x.id, sample: x.sample } : x)), 'Trade updated.')
      setEditing(null)
    } else {
      commit([...trades, { ...t, id: newId(), sample: false }], 'Trade added.')
    }
    setFormKey((k) => k + 1)
  }
  const startEdit = (t: Trade) => {
    setEditing(t)
    setFormKey((k) => k + 1)
    formRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }
  const cancelEdit = () => { setEditing(null); setFormKey((k) => k + 1) }
  const remove = (t: Trade) => {
    if (editing?.id === t.id) cancelEdit()
    commit(trades.filter((x) => x.id !== t.id), 'Trade deleted.')
  }
  const loadSamples = () => commit([...trades, ...makeSampleTrades()], 'Loaded 12 sample trades. They are illustrative, not real.')
  const clearSamples = () => commit(trades.filter((t) => !t.sample), 'Sample trades removed.')
  const clearAll = () => {
    setConfirmClear(false)
    setEditing(null)
    setFormKey((k) => k + 1)
    commit([], 'All journal entries cleared from this browser.')
  }
  const exportCsv = () => {
    const blob = new Blob(['﻿', tradesToCsv(trades)], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `strikewick-journal-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    setStatus(`Exported ${trades.length} trade${trades.length === 1 ? '' : 's'} to CSV.`)
  }

  const cols: Column<Trade>[] = [
    { key: 'datetime', header: 'Entry', render: (t) => <span className="num whitespace-nowrap text-[0.82rem] text-fg-2">{fmtWhen(t.datetime)}</span> },
    { key: 'contract', header: 'Contract', render: (t) => (
      <span className="whitespace-nowrap"><span className="num text-fg">{contract(t)}</span>{t.sample && <Badge className="ml-2">sample</Badge>}</span>
    ) },
    { key: 'side', header: 'Side', render: (t) => <span className="text-fg-2">{t.side === 'buy' ? 'Buy' : 'Sell'}</span> },
    { key: 'qty', header: 'Qty', align: 'right', mono: true, render: (t) => `${t.lots}×${t.lotSize} = ${fmtIN(quantity(t))}` },
    { key: 'px', header: 'Entry → Exit', align: 'right', mono: true, render: (t) => `${t.entryPrice} → ${t.exitPrice}` },
    { key: 'pnl', header: 'P&L', align: 'right', render: (t) => <Pnl value={tradePnl(t)} dp={2} /> },
    { key: 'setup', header: 'Setup', render: (t) => <span className="text-fg-2">{t.setup || '—'}</span> },
    { key: 'mistake', header: 'Mistake', render: (t) => <span className={t.mistake === 'none' ? 'text-fg-3' : 'text-gold'}>{t.mistake}</span> },
    { key: 'act', header: <span className="sr-only">Actions</span>, align: 'right', render: (t) => (
      <span className="inline-flex gap-1">
        <button type="button" onClick={() => startEdit(t)} aria-label={`Edit ${contract(t)} trade from ${fmtWhen(t.datetime)}`} className="grid size-10 place-items-center rounded-full text-fg-2 transition-colors hover:bg-white/[0.07] hover:text-fg"><Pencil aria-hidden className="size-4" /></button>
        <button type="button" onClick={() => remove(t)} aria-label={`Delete ${contract(t)} trade from ${fmtWhen(t.datetime)}`} className="grid size-10 place-items-center rounded-full text-fg-2 transition-colors hover:bg-white/[0.07] hover:text-fg"><Trash2 aria-hidden className="size-4" /></button>
      </span>
    ) },
  ]

  return (
    <section id="journal" aria-labelledby="journal-h" className="scroll-mt-28 py-16 sm:py-24">
      <Reveal>
        <SectionHeader
          eyebrow="Level 25 · Journal"
          title={<span id="journal-h">Your trade journal</span>}
          lead="Stored in this browser only — no account, no sync. Export a CSV to keep a backup."
        />
      </Reveal>

      <div role="status" aria-live="polite" className="mt-6 min-h-6 text-[0.86rem] text-fg-2">{status}</div>
      {!storageOk && (
        <p role="alert" className="mb-6 rounded-xl border border-gold/40 bg-gold/[0.06] px-4 py-3 text-[0.86rem] leading-relaxed text-fg">
          This browser is blocking local storage, so entries will be lost when you close or reload the tab. Export a CSV before you leave.
        </p>
      )}

      <div ref={formRef} className="scroll-mt-28 mt-4">
        <EntryForm key={formKey} initial={editing ? tradeToDraft(editing) : blankDraft()} editing={editing !== null} setups={setups} onSubmit={submit} onCancel={cancelEdit} />
      </div>

      <div className="mt-14 sm:mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-[1.5rem] font-semibold text-fg">Trades</h3>
            <p className="mt-1 text-[0.86rem] text-fg-2">{trades.length === 0 ? 'No entries yet.' : filtered ? `Showing ${shown.length} of ${trades.length}.` : `${trades.length} entr${trades.length === 1 ? 'y' : 'ies'}, newest first.`}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {sampleCount > 0 && <Button variant="secondary" size="sm" onClick={clearSamples} icon={<FlaskConical aria-hidden className="size-4" />}>Remove {sampleCount} sample{sampleCount === 1 ? '' : 's'}</Button>}
            <Button variant="secondary" size="sm" onClick={exportCsv} disabled={trades.length === 0} icon={<Download aria-hidden className="size-4" />}>Export CSV</Button>
            {confirmClear ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-3 py-1">
                <span className="text-[0.8rem] text-fg">Delete all {trades.length}?</span>
                <Button size="sm" variant="secondary" onClick={clearAll}>Yes, clear</Button>
                <Button size="sm" variant="ghost" onClick={() => setConfirmClear(false)}>Keep</Button>
              </span>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setConfirmClear(true)} disabled={trades.length === 0} icon={<Trash2 aria-hidden className="size-4" />}>Clear all</Button>
            )}
          </div>
        </div>

        {trades.length === 0 ? (
          <div className="mt-6 grid gap-6 rounded-[var(--radius-xl)] border border-dashed border-line-strong p-6 sm:p-10 md:grid-cols-[1.3fr_1fr] md:items-center">
            <div>
              <h4 className="font-display text-[1.3rem] font-semibold text-fg">Your journal is empty</h4>
              <p className="mt-2 max-w-lg text-[0.92rem] leading-relaxed text-fg-2">Log the first trade above. Write the reason before you look at the result, tag any mistake honestly, and the statistics below will build up from your own entries.</p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <Button onClick={loadSamples} icon={<FlaskConical aria-hidden className="size-4" />}>Load 12 sample trades</Button>
              <p className="text-[0.78rem] text-fg-3">Illustrative entries tagged &ldquo;sample&rdquo;. Remove them in one click.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:max-w-xl">
              <SelectField label="Filter by setup" value={fSetup} onChange={setFSetup} options={[{ value: 'all', label: 'All setups' }, ...setups.map((s) => ({ value: s, label: s })), ...(trades.some((t) => t.setup === '') ? [{ value: '__none', label: 'Unlabelled' }] : [])]} />
              <SelectField label="Filter by mistake" value={fMistake} onChange={setFMistake} options={[{ value: 'all', label: 'All tags' }, ...MISTAKES.map((m) => ({ value: m, label: m }))]} />
            </div>
            <div className="mt-5">
              {shown.length === 0 ? (
                <div className="rounded-[var(--radius-xl)] border border-line p-8 text-center">
                  <p className="text-[0.92rem] text-fg-2">No trades match these filters.</p>
                  <Button className="mt-4" variant="secondary" size="sm" onClick={() => { setFSetup('all'); setFMistake('all') }}>Reset filters</Button>
                </div>
              ) : (
                <DataTable caption="Trade journal entries" columns={cols} rows={shown} rowKey={(t) => t.id} />
              )}
            </div>
          </>
        )}
      </div>

      {trades.length > 0 && (
        <div className="mt-16 sm:mt-24">
          <Reveal>
            <span className="eyebrow">Performance</span>
            <h3 className="mb-8 mt-3 font-display text-[clamp(1.5rem,3vw,2.2rem)] font-semibold leading-tight text-fg">What your own numbers say</h3>
            <Performance stats={stats} />
          </Reveal>
        </div>
      )}

      <div className="mt-16 sm:mt-24"><Reveal><WeeklyReview stats={stats} /></Reveal></div>
      <p className="mt-10 text-[0.78rem] leading-relaxed text-fg-3">For education and self-review only. P&amp;L shown is gross and excludes brokerage, taxes and slippage.</p>
    </section>
  )
}
