/** Shared Recharts styling so every chart on the site reads as one system. */
export const chart = {
  bull: '#00E58A',
  bullDeep: '#00C878',
  bear: '#F04444',
  bearDeep: '#A91626',
  gold: '#C9A86A',
  ice: '#8FB4D9',
  fg: '#F4F7FA',
  fg2: '#929DA9',
  grid: 'rgba(255,255,255,0.06)',
  axis: 'rgba(255,255,255,0.16)',
} as const

export const axisProps = {
  tick: { fill: chart.fg2, fontSize: 11, fontFamily: "'JetBrains Mono Variable', monospace" },
  tickLine: false as const,
  axisLine: { stroke: chart.axis },
}

export const gridProps = { stroke: chart.grid, strokeDasharray: '3 5', vertical: false as const }

export const tooltipStyle = {
  contentStyle: {
    background: 'rgba(11,16,21,0.94)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    boxShadow: '0 18px 40px -12px rgba(0,0,0,0.8)',
    fontFamily: "'JetBrains Mono Variable', monospace",
    fontSize: 12,
    color: chart.fg,
  },
  labelStyle: { color: chart.fg2, marginBottom: 4 },
  itemStyle: { color: chart.fg, padding: 0 },
  cursor: { stroke: 'rgba(255,255,255,0.18)', strokeDasharray: '3 4' },
}
