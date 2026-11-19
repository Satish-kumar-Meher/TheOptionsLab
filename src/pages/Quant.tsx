import { useMemo, useState } from 'react'
import { Disclaimer, PageHeader } from '@/components/ui'
import { DEFAULT_PARAMS, equityCurve, generateTrades, type TradeParams } from '@/lib/backtest'
import { AdvancedTesting } from '@/components/quant/AdvancedTesting'
import { AlgoSection } from '@/components/quant/AlgoSection'
import { BacktestStudio } from '@/components/quant/BacktestStudio'
import { DataSection } from '@/components/quant/DataSection'
import { EngineBlueprint } from '@/components/quant/EngineBlueprint'
import { MetricsSection } from '@/components/quant/MetricsSection'
import { PipelineSection } from '@/components/quant/PipelineSection'
import { QuantNav } from '@/components/quant/QuantNav'
import { CAPITAL } from '@/components/quant/shared'

export default function Quant() {
  const [params, setParams] = useState<TradeParams>(DEFAULT_PARAMS)
  const trades = useMemo(() => generateTrades(params), [params])
  const curve = useMemo(() => equityCurve(trades, CAPITAL), [trades])
  return (
    <>
      <PageHeader eyebrow="Level 24 · Quant tools" title={<>Backtesting <span className="text-gold-gradient">Studio</span></>} description="From data and pipelines to backtests, validation and a complete engine blueprint. Every number on this page is synthetic and exists to teach method, not to suggest a strategy that works." />
      <QuantNav />
      <DataSection />
      <PipelineSection />
      <BacktestStudio params={params} setParams={setParams} trades={trades} curve={curve} />
      <MetricsSection trades={trades} />
      <AdvancedTesting trades={trades} />
      <AlgoSection />
      <EngineBlueprint />
      <div className="container-x py-12"><Disclaimer /></div>
    </>
  )
}
