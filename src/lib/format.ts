const inr = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })
const inr2 = new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

/** 1234567 → "12,34,567" (Indian grouping). */
export const fmtIN = (n: number, dp = 0) => (Number.isFinite(n) ? (dp === 2 ? inr2.format(n) : inr.format(n)) : '—')
export const fmtRupee = (n: number, dp = 0) => (Number.isFinite(n) ? `${n < 0 ? '−' : ''}₹${fmtIN(Math.abs(n), dp)}` : '—')
export const fmtNum = (n: number, dp = 2) => (Number.isFinite(n) ? n.toFixed(dp) : '—')
export const fmtPct = (n: number, dp = 1) => (Number.isFinite(n) ? `${(n * 100).toFixed(dp)}%` : '—')
export const fmtSigned = (n: number, dp = 0) => (Number.isFinite(n) ? `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n).toFixed(dp)}` : '—')
/** 4200000 → "42.0L" ; 25000000 → "2.50Cr" (how OI is often quoted in India). */
export const fmtCompactIN = (n: number) => {
  const a = Math.abs(n)
  const s = n < 0 ? '−' : ''
  if (a >= 1e7) return `${s}${(a / 1e7).toFixed(2)}Cr`
  if (a >= 1e5) return `${s}${(a / 1e5).toFixed(1)}L`
  if (a >= 1e3) return `${s}${(a / 1e3).toFixed(1)}K`
  return `${s}${a.toFixed(0)}`
}
export const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
