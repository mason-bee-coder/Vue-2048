import { GRID_SIZE } from '@/contants'
import { Block } from '@/models/block'

export const convert2DToBlockArray = (array2D: number[][]): Block[] => {
  const result: Block[] = []
  array2D.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const block = new Block(x, y, cell)
        result.push(block)
      }
    })
  })

  return result
}

export const convertArrayBlockTo2D = (blocks: Block[], size = GRID_SIZE): number[][] => {
  // Create an 2D empty array
  const array2D: number[][] = []

  // loop through the rows (Y)
  for (let row = 0; row < size; row++) {
    array2D[row] = new Array(size).fill(0)

    const blockWithSameRow = blocks.filter((block) => block.y === row)
    blockWithSameRow.forEach((cell) => {
      // update the cell value to the array 2D
      array2D[row][cell.x] = cell.value
    })
  }

  return array2D
}
