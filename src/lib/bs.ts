/** Black–Scholes–Merton pricing + Greeks. Pure functions, no deps.
 *  Conventions (documented so every lab/lesson agrees):
 *   - S, K in index points; T in YEARS (calendar: days/365); r, sigma, q as decimals (0.065 = 6.5%).
 *   - theta  : price change per ONE CALENDAR DAY (negative for long options).
 *   - vega   : price change per ONE volatility point (1% IV).
 *   - rho    : price change per ONE percentage point of interest rate.
 *   - Index options on NSE are European, so BSM is the appropriate educational model.
 *   Educational model only — real premiums differ (skew, supply/demand, bid-ask). */

export type OptType = 'CE' | 'PE'

export interface Greeks {
  price: number
  delta: number
  gamma: number
  theta: number
  vega: number
  rho: number
}

const SQRT_2PI = Math.sqrt(2 * Math.PI)
export const npdf = (x: number) => Math.exp(-0.5 * x * x) / SQRT_2PI

/** Standard normal CDF (Abramowitz & Stegun 26.2.17, |err| < 7.5e-8). */
export function ncdf(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x))
  const d = npdf(x)
  const p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))))
  return x >= 0 ? 1 - p : p
}

export const intrinsic = (type: OptType, S: number, K: number) => (type === 'CE' ? Math.max(S - K, 0) : Math.max(K - S, 0))

export function bs(type: OptType, S: number, K: number, T: number, r: number, sigma: number, q = 0): Greeks {
  if (T <= 0 || sigma <= 0) {
    const price = intrinsic(type, S, K)
    const delta = type === 'CE' ? (S > K ? 1 : 0) : S < K ? -1 : 0
    return { price, delta, gamma: 0, theta: 0, vega: 0, rho: 0 }
  }
  const sqT = Math.sqrt(T)
  const d1 = (Math.log(S / K) + (r - q + 0.5 * sigma * sigma) * T) / (sigma * sqT)
  const d2 = d1 - sigma * sqT
  const eqT = Math.exp(-q * T)
  const erT = Math.exp(-r * T)
  const pdf1 = npdf(d1)
  const gamma = (eqT * pdf1) / (S * sigma * sqT)
  const vega = (S * eqT * pdf1 * sqT) / 100
  if (type === 'CE') {
    const price = S * eqT * ncdf(d1) - K * erT * ncdf(d2)
    const thetaYear = -(S * eqT * pdf1 * sigma) / (2 * sqT) - r * K * erT * ncdf(d2) + q * S * eqT * ncdf(d1)
    return { price, delta: eqT * ncdf(d1), gamma, theta: thetaYear / 365, vega, rho: (K * T * erT * ncdf(d2)) / 100 }
  }
  const price = K * erT * ncdf(-d2) - S * eqT * ncdf(-d1)
  const thetaYear = -(S * eqT * pdf1 * sigma) / (2 * sqT) + r * K * erT * ncdf(-d2) - q * S * eqT * ncdf(-d1)
  return { price, delta: eqT * (ncdf(d1) - 1), gamma, theta: thetaYear / 365, vega, rho: (-K * T * erT * ncdf(-d2)) / 100 }
}

export const price = (type: OptType, S: number, K: number, T: number, r: number, sigma: number, q = 0) => bs(type, S, K, T, r, sigma, q).price

/** Implied volatility by bisection. Returns NaN if the price is outside no-arbitrage bounds. */
export function impliedVol(type: OptType, target: number, S: number, K: number, T: number, r: number, q = 0): number {
  let lo = 0.0005
  let hi = 5
  if (target < price(type, S, K, T, r, lo, q) - 1e-9 || target > price(type, S, K, T, r, hi, q)) return NaN
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2
    if (price(type, S, K, T, r, mid, q) < target) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}

/** One-standard-deviation expected move over `days` calendar days for a given annualised vol (decimal). */
export const expectedMove = (spot: number, vol: number, days: number) => spot * vol * Math.sqrt(days / 365)

export const daysToYears = (d: number) => d / 365
