import type { VisualSpec } from '@/data/topicLessonTypes'
import { BarsVisual, CompareVisual, FlowVisual, LadderVisual, LayersVisual, MatrixVisual, OrderBookVisual, TimelineVisual } from './visual/Blocks'
import { CandlesVisual, GaugeVisual, OiVisual } from './visual/Market'
import { PayoffVisual } from './visual/Payoff'
import { CurveVisual } from './visual/Curves'
import { cn } from '@/components/ui'

/** Data-driven SVG/HTML illustration. Each kind renders a <figure> (title, graphic with role="img" + aria-label, figcaption). */
export function Visual({ spec, className }: { spec: VisualSpec; className?: string }) {
  return <div className={cn('min-w-0 max-w-full', className)}>{render(spec)}</div>
}

function render(spec: VisualSpec) {
  switch (spec.kind) {
    case 'flow': return <FlowVisual spec={spec} />
    case 'compare': return <CompareVisual spec={spec} />
    case 'bars': return <BarsVisual spec={spec} />
    case 'ladder': return <LadderVisual spec={spec} />
    case 'payoff': return <PayoffVisual spec={spec} />
    case 'candles': return <CandlesVisual spec={spec} />
    case 'oi': return <OiVisual spec={spec} />
    case 'curve': return <CurveVisual spec={spec} />
    case 'matrix': return <MatrixVisual spec={spec} />
    case 'gauge': return <GaugeVisual spec={spec} />
    case 'orderBook': return <OrderBookVisual spec={spec} />
    case 'timeline': return <TimelineVisual spec={spec} />
    case 'layers': return <LayersVisual spec={spec} />
  }
}

export default Visual
