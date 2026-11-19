import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props { children: ReactNode; fallback?: ReactNode; label?: string }
export class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error: Error, info: ErrorInfo) { console.warn(`[${this.props.label ?? 'ErrorBoundary'}]`, error.message, info.componentStack?.split('\n')[1]?.trim()) }
  render() {
    if (this.state.failed) return this.props.fallback ?? <div className="grid min-h-64 place-items-center p-8 text-center text-fg-2">This view could not be displayed. Reload the page to try again.</div>
    return this.props.children
  }
}
