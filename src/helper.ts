import { Block } from './models/block'
import { GRID_SIZE } from '@/contants'

export const genArray = (length: number) => new Array(length).fill(null)

export const detectPairInGrid = <T extends Block>(arr: Array<T>) => {
  const l = arr.length

  const pairs = []

  for (let i = 0; i < l - 1; i++) {
    for (let u = i + 1; u < l - 1; u++) {
      const current = arr[i]
      const next = arr[u]

      if (current.value !== next.value) {
        continue
      }

      if (
        (current.x === next.x && Math.abs(current.y - next.y) === 1) ||
        (current.y === next.y && Math.abs(current.x - next.x) === 1)
      ) {
        pairs.push(current, next)
      }
    }
  }

  return pairs
}

export const hasPairInGrid = <T extends Block>(arr: Array<T>) => !!detectPairInGrid(arr).length

