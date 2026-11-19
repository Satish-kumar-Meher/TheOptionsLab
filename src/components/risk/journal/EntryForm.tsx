import { useMemo, useState, type FormEvent } from 'react'
import { Save, X } from 'lucide-react'
import { Button } from '@/components/ui'
import { fmtRupee } from '@/lib/format'
import {
  DEFAULT_LOT_SIZE, INSTRUMENTS, MISTAKES, TEXT_LIMITS, toLocalDate, toLocalDateTime, tradePnl, validateDraft,
  type Instrument, type Trade, type TradeDraft,
} from '@/lib/journal'
import { AreaField, SelectField, TextField } from './fields'

export const blankDraft = (): TradeDraft => ({
  datetime: toLocalDateTime(new Date()),
  exitDatetime: '',
  instrument: 'NIFTY',
  expiry: toLocalDate(new Date()),
  strike: '',
  type: 'CE',
  side: 'buy',
  lots: '1',
  lotSize: String(DEFAULT_LOT_SIZE.NIFTY),
  entryPrice: '',
  exitPrice: '',
  entryReason: '',
  exitReason: '',
  setup: '',
  oiNote: '',
  vix: '',
  ivNote: '',
  mistake: 'none',
  notes: '',
})

type NewTrade = Omit<Trade, 'id' | 'sample'>

export function EntryForm({ initial, editing, setups, onSubmit, onCancel }: {
  initial: TradeDraft
  editing: boolean
  setups: string[]
  onSubmit: (t: NewTrade) => void
  onCancel: () => void
}) {
  const [d, setD] = useState<TradeDraft>(initial)
  const [touched, setTouched] = useState<Set<keyof TradeDraft>>(new Set())
  const [submitted, setSubmitted] = useState(false)
  const { errors, trade } = useMemo(() => validateDraft(d), [d])
  const set = <K extends keyof TradeDraft>(k: K) => (v: string) => setD((p) => ({ ...p, [k]: v }))
  const blur = (k: keyof TradeDraft) => () => setTouched((t) => new Set(t).add(k))
  const err = (k: keyof TradeDraft): string | undefined => (submitted || touched.has(k) ? errors[k] : undefined)
  const fut = d.type === 'FUT'
  const errCount = Object.keys(errors).length
  const preview = trade ? tradePnl(trade) : null

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    if (trade) onSubmit(trade)
  }
  const changeInstrument = (v: string) => {
    setD((p) => ({ ...p, instrument: v, lotSize: String(DEFAULT_LOT_SIZE[v as Instrument] ?? p.lotSize) }))
  }

  return (
    <form onSubmit={submit} noValidate className="glass-solid p-5 sm:p-7" aria-label={editing ? 'Edit trade' : 'Add trade'}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-[1.4rem] font-semibold text-fg">{editing ? 'Edit trade' : 'Log a trade'}</h3>
          <p className="mt-1 text-[0.86rem] text-fg-2">P&amp;L is computed for you. Buy: exit − entry. Sell: entry − exit. It is gross of brokerage, taxes and slippage.</p>
        </div>
        {editing && <Button variant="ghost" size="sm" onClick={onCancel} icon={<X aria-hidden className="size-4" />}>Cancel</Button>}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-4">
        <TextField className="col-span-2" label="Entry date and time" type="datetime-local" value={d.datetime} onChange={set('datetime')} onBlur={blur('datetime')} error={err('datetime')} />
        <TextField className="col-span-2" label="Exit date and time (optional)" type="datetime-local" value={d.exitDatetime} onChange={set('exitDatetime')} onBlur={blur('exitDatetime')} error={err('exitDatetime')} />
        <SelectField label="Instrument" value={d.instrument} onChange={changeInstrument} options={INSTRUMENTS.map((i) => ({ value: i, label: i }))} error={err('instrument')} />
        <TextField label="Expiry" type="date" value={d.expiry} onChange={set('expiry')} onBlur={blur('expiry')} error={err('expiry')} />
        <SelectField label="Type" value={d.type} onChange={set('type')} options={[{ value: 'CE', label: 'Call (CE)' }, { value: 'PE', label: 'Put (PE)' }, { value: 'FUT', label: 'Future' }]} error={err('type')} />
        <TextField label={fut ? 'Strike (n/a for futures)' : 'Strike'} type="number" inputMode="decimal" value={fut ? '' : d.strike} onChange={set('strike')} onBlur={blur('strike')} error={fut ? undefined : err('strike')} placeholder={fut ? '—' : '24000'} />
        <SelectField label="Side" value={d.side} onChange={set('side')} options={[{ value: 'buy', label: 'Buy (long)' }, { value: 'sell', label: 'Sell (short)' }]} error={err('side')} />
        <TextField label="Lots" type="number" inputMode="numeric" value={d.lots} onChange={set('lots')} onBlur={blur('lots')} error={err('lots')} />
        <TextField label="Lot size" type="number" inputMode="numeric" value={d.lotSize} onChange={set('lotSize')} onBlur={blur('lotSize')} error={err('lotSize')} hint="Check the current NSE contract specification." />
        <TextField label="Entry price (₹)" type="number" inputMode="decimal" step="0.05" value={d.entryPrice} onChange={set('entryPrice')} onBlur={blur('entryPrice')} error={err('entryPrice')} />
        <TextField label="Exit price (₹)" type="number" inputMode="decimal" step="0.05" value={d.exitPrice} onChange={set('exitPrice')} onBlur={blur('exitPrice')} error={err('exitPrice')} />
        <TextField label="India VIX at entry" type="number" inputMode="decimal" step="0.01" value={d.vix} onChange={set('vix')} onBlur={blur('vix')} error={err('vix')} placeholder="optional" />
      </div>

      <div className="mt-4 grid gap-x-4 gap-y-4 md:grid-cols-2">
        <AreaField label="Entry reason" value={d.entryReason} onChange={set('entryReason')} onBlur={blur('entryReason')} error={err('entryReason')} maxLength={TEXT_LIMITS.reason} />
        <AreaField label="Exit reason" value={d.exitReason} onChange={set('exitReason')} onBlur={blur('exitReason')} error={err('exitReason')} maxLength={TEXT_LIMITS.reason} />
        <div className="flex flex-col gap-4">
          <TextField label="Setup" value={d.setup} onChange={set('setup')} maxLength={TEXT_LIMITS.setup} hint="Groups trades in the setup-wise table, e.g. Opening range breakout." />
          {setups.length > 0 && (
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Reuse an existing setup name">
              {setups.slice(0, 6).map((s) => (
                <button key={s} type="button" onClick={() => setD((p) => ({ ...p, setup: s }))} className="min-h-8 rounded-full border border-line-strong px-3 text-[0.76rem] text-fg-2 transition-colors hover:border-gold/50 hover:text-fg">{s}</button>
              ))}
            </div>
          )}
        </div>
        <SelectField label="Mistake tag" value={d.mistake} onChange={set('mistake')} options={MISTAKES.map((m) => ({ value: m, label: m === 'none' ? 'none (followed the plan)' : m }))} error={err('mistake')} />
        <AreaField label="OI snapshot note" value={d.oiNote} onChange={set('oiNote')} maxLength={TEXT_LIMITS.note} hint="What the chain showed. OI alone does not reveal who initiated." />
        <AreaField label="IV / Greeks note" value={d.ivNote} onChange={set('ivNote')} maxLength={TEXT_LIMITS.note} />
        <AreaField className="md:col-span-2" label="Screenshot link or notes" value={d.notes} onChange={set('notes')} maxLength={TEXT_LIMITS.note} hint="Stored as plain text only." />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <div aria-live="polite" role="status" className="min-w-0 text-[0.86rem] text-fg-2">
          {preview !== null ? (
            <>Computed P&amp;L: <span className={`num text-[1.1rem] ${preview > 0 ? 'text-bull' : preview < 0 ? 'text-bear' : 'text-fg'}`}>{preview > 0 ? '▲ ' : preview < 0 ? '▼ ' : ''}{fmtRupee(preview, 2)}</span></>
          ) : submitted && errCount > 0 ? (
            <span className="text-gold">{errCount} field{errCount === 1 ? '' : 's'} need attention.</span>
          ) : (
            'Fill the required fields to see computed P&L.'
          )}
        </div>
        <Button type="submit" icon={<Save aria-hidden className="size-4" />}>{editing ? 'Save changes' : 'Add trade'}</Button>
      </div>
    </form>
  )
}
