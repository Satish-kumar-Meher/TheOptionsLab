import { bs, impliedVol, ncdf } from '../../lib/bs'
import type { OptType } from '../../lib/bs'

/** Shared model inputs for every lesson (educational values; see BRIEF). */
export const SPOT = 24000
export const LOT = 65
export const RATE = 0.065
export const IV = 0.14

/** Indian-grouped number with fixed decimals. */
export const f = (x: number, d = 0): string =>
  x.toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d })

/** Signed number, e.g. +1,250 / -980. */
export const sg = (x: number, d = 0): string => (x > 0 ? '+' : x < 0 ? '-' : '') + f(Math.abs(x), d)

/** Black-Scholes at `days` calendar days to expiry. */
export const g = (type: OptType, K: number, days: number, iv = IV, S = SPOT) => bs(type, S, K, days / 365, RATE, iv)

/** Black-Scholes at `min` minutes to expiry (calendar-minute convention: T = min / 525,600). */
export const gm = (type: OptType, K: number, min: number, iv = IV, S = SPOT) => bs(type, S, K, min / 525600, RATE, iv)

export { bs, impliedVol, ncdf }
export type { OptType }
