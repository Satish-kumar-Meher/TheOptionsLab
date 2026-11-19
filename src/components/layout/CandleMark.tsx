/** Brand mark: one bear and one bull candle. */
export function CandleMark({ className = 'size-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden fill="none">
      <rect width="32" height="32" rx="9" fill="#0B1015" stroke="rgba(255,255,255,0.12)" />
      <path d="M11 5.5v21" stroke="#F04444" strokeWidth="1.7" strokeLinecap="round" />
      <rect x="7.6" y="10.5" width="6.8" height="10" rx="1.6" fill="#A91626" stroke="#F04444" strokeWidth="1.2" />
      <path d="M21.5 4.5v22" stroke="#00E58A" strokeWidth="1.7" strokeLinecap="round" />
      <rect x="18.1" y="7.5" width="6.8" height="12.5" rx="1.6" fill="#007A4B" stroke="#00E58A" strokeWidth="1.2" />
    </svg>
  )
}
