/** Hand-authored OHLC for the hero: an uptrend with pullbacks, echoing the reference images. Units are scene units. */
export interface HeroCandle { o: number; c: number; h: number; l: number }
export const HERO_CANDLES: HeroCandle[] = [
  { o: 1.2, c: 0.6, h: 1.5, l: 0.3 },
  { o: 0.6, c: 1.5, h: 1.8, l: 0.4 },
  { o: 1.5, c: 1.0, h: 1.9, l: 0.7 },
  { o: 1.0, c: 2.1, h: 2.4, l: 0.8 },
  { o: 2.1, c: 1.6, h: 2.4, l: 1.2 },
  { o: 1.6, c: 2.7, h: 3.0, l: 1.4 },
  { o: 2.7, c: 2.0, h: 3.0, l: 1.6 },
  { o: 2.0, c: 3.6, h: 3.9, l: 1.8 },
  { o: 3.6, c: 3.0, h: 4.0, l: 2.6 },
  { o: 3.0, c: 4.5, h: 4.9, l: 2.7 },
  { o: 4.5, c: 3.6, h: 4.9, l: 3.2 },
  { o: 3.6, c: 5.2, h: 5.7, l: 3.4 },
  { o: 5.2, c: 4.4, h: 5.6, l: 4.0 },
  { o: 4.4, c: 5.9, h: 6.4, l: 4.2 },
]
export const BULL = '#00E58A'
export const BEAR = '#F04444'
