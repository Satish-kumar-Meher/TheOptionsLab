import { Link } from 'react-router-dom'
import { CandleMark } from './CandleMark'
import { Disclaimer } from '../ui'
import { counts } from '@/data/curriculum'

const cols = [
  { h: 'Learn', links: [['Curriculum', '/curriculum'], ['Start Level 1', '/learn/1.1'], ['Roadmap & exercises', '/roadmap'], ['Common misconceptions', '/roadmap#misconceptions']] },
  { h: 'Labs', links: [['Greeks Lab', '/labs/greeks'], ['Option Chain Lab', '/labs/option-chain'], ['Open Interest Lab', '/labs/open-interest'], ['Market Structure Lab', '/labs/market-structure'], ['Expiry-Day Gamma Lab', '/labs/expiry-gamma']] },
  { h: 'Practice', links: [['Strategy Library', '/strategies'], ['Risk & Psychology', '/risk'], ['Trade Journal', '/risk#journal'], ['Backtesting Studio', '/quant']] },
]
export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line bg-bg-2/60">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.4fr_2fr]">
        <div className="max-w-sm">
          <Link to="/" className="inline-flex items-center gap-2.5"><CandleMark className="size-8" /><span className="font-display text-xl font-semibold tracking-[-0.03em]">Strike<span className="text-gold">wick</span></span></Link>
          <p className="mt-5 text-[0.92rem] leading-relaxed text-fg-2">An options and option-chain analysis curriculum: {counts.levels} levels, {counts.modules} modules and {counts.topics.toLocaleString('en-IN')} topics, from market foundations to quantitative backtesting — built around NIFTY, BANKNIFTY and SENSEX.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {cols.map((c) => (
            <div key={c.h}>
              <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-gold">{c.h}</h2>
              <ul className="mt-4 space-y-2.5">
                {c.links.map(([l, to]) => (<li key={to}><Link to={to} className="text-[0.9rem] text-fg-2 transition-colors hover:text-fg">{l}</Link></li>))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="container-x space-y-3 border-t border-line py-8">
        <Disclaimer>Educational content only — not investment advice, research or a recommendation. Trading options involves substantial risk of loss. All market data, option chains, backtests and results on this site are <strong className="font-medium text-fg-2">simulated for teaching</strong> unless explicitly labelled otherwise. Past or simulated performance does not guarantee future results.</Disclaimer>
        <p className="text-[0.75rem] text-fg-3">Progress and journal entries are stored in your browser only — there is no account or server. © {new Date().getFullYear()} The Options Lab.</p>
        <p className="text-[0.75rem] text-fg-3">Made with ❤️ by <a href="https://satish-portfolio-zeta.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gold transition-colors hover:text-fg">Satish.dev</a></p>
      </div>
    </footer>
  )
}
