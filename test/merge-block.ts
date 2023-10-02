import { Direction } from '@/models/direction'

export const MERGE_BLOCK_DATA_SOURCE = [
  {
    input: [
      [0, 2, 2, 0],
      [2, 0, 2, 4],
      [2, 2, 0, 2],
      [4, 0, 2, 2]
    ],
    output: [
      [4, 4, 4, 4],
      [4, 0, 2, 4],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    direction: Direction.UP
  },
  {
    input: [
      [0, 2, 2, 0],
      [2, 0, 2, 4],
      [2, 2, 0, 2],
      [4, 0, 2, 2]
    ],
    output: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [4, 0, 2, 4],
      [4, 4, 4, 4]
    ],
    direction: Direction.DOWN
  },
  {
    input: [
      [0, 2, 2, 0],
      [2, 0, 2, 4],
      [2, 2, 0, 2],
      [4, 0, 2, 2]
    ],
    output: [
      [4, 0, 0, 0],
      [4, 4, 0, 0],
      [4, 2, 0, 0],
      [4, 4, 0, 0]
    ],
    direction: Direction.LEFT
  },
  {
    input: [
      [0, 2, 2, 0],
      [2, 0, 2, 4],
      [2, 2, 0, 2],
      [4, 0, 2, 2]
    ],
    output: [
      [0, 0, 0, 4],
      [0, 0, 4, 4],
      [0, 0, 2, 4],
      [0, 0, 4, 4]
    ],
    direction: Direction.RIGHT
  },
  {
    input: [
      [4, 32, 16, 2],
      [2, 16, 32, 4],
      [128, 8, 8, 4],
      [2, 2, 2, 0]
    ],
    output: [
      [4, 32, 16, 2],
      [2, 16, 32, 4],
      [128, 16, 4, 0],
      [4, 2, 0, 0]
    ],
    direction: Direction.LEFT
  }
]
