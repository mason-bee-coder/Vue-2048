import { GRID_SIZE } from '@/contants'
import { genArray } from '@/helper'

const GAP_SIGN = '-'
const getPairXYKey = (x: number, y: number) => `${x}${GAP_SIGN}${y}`

const getXYFromPair = (pair: string) => {
  const [x, y] = pair.split(GAP_SIGN)
  return { x: Number(x), y: Number(y) }
}

const PAIR_X_Y = (() => {
  const pairs: Array<string> = []

  genArray(GRID_SIZE).forEach((_, i) => {
    genArray(GRID_SIZE).forEach((_, u) => {
      const key = getPairXYKey(i, u)
      pairs.push(key)
    })
  })

  return pairs
})()

export { getPairXYKey, getXYFromPair, PAIR_X_Y }
