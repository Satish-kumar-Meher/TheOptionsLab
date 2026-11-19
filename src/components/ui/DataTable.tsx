import type { ReactNode } from 'react'
import { cn } from './cn'

export interface Column<T> {
  key: string
  header: ReactNode
  align?: 'left' | 'right' | 'center'
  mono?: boolean
  width?: string
  className?: string
  render?: (row: T, index: number) => ReactNode
}
export function DataTable<T>({ columns, rows, rowKey, dense, caption, rowClassName, className }: { columns: Column<T>[]; rows: T[]; rowKey: (row: T, i: number) => string | number; dense?: boolean; caption?: string; rowClassName?: (row: T, i: number) => string | undefined; className?: string }) {
  return (
    <div className={cn('overflow-x-auto rounded-[var(--radius-xl)] border border-line bg-surface/50', className)}>
      <table className="w-full border-collapse text-left">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-line bg-white/[0.025]">
            {columns.map((c) => (
              <th key={c.key} scope="col" style={{ width: c.width }} className={cn('whitespace-nowrap px-4 font-mono text-[0.68rem] font-medium uppercase tracking-[0.1em] text-fg-2', dense ? 'py-2' : 'py-3', c.align === 'right' && 'text-right', c.align === 'center' && 'text-center')}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={rowKey(row, i)} className={cn('border-b border-line/70 transition-colors last:border-0 hover:bg-white/[0.025]', rowClassName?.(row, i))}>
              {columns.map((c) => (
                <td key={c.key} className={cn('px-4 text-[0.88rem]', dense ? 'py-2' : 'py-3', c.mono && 'num', c.align === 'right' && 'text-right', c.align === 'center' && 'text-center', c.className)}>
                  {c.render ? c.render(row, i) : String((row as Record<string, unknown>)[c.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
