import { beforeEach, describe, expect, it, test, vi } from 'vitest'
// import useBlockStore from '../src/stores/block'
import useBlockStore from '@/stores/block'
import { getPairXYKey } from '@/models/grid'
import { createApp } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import { Block } from '@/models/block'
import { forEach, isEqual, pick } from 'lodash'
import { Direction } from '@/models/direction'
import { MERGE_BLOCK_DATA_SOURCE } from './merge-block'
import { convert2DToBlockArray, convertArrayBlockTo2D } from './helper'

const getBlockCompareProperties = (block: Block) => {
  return pick(block, ['x', 'y', 'value'])
}

const app = createApp({})

describe('Random Block', () => {
  beforeEach(() => {
    const pinia = createPinia()
    app.use(pinia)
    setActivePinia(pinia)
  })

  it('Should random a block and remove it out of emptyPairs', () => {
    const blockStore = useBlockStore()
    blockStore.randomBlock()
    expect(blockStore.blockList.length === 1)

    const generatedBlock = blockStore.blockList[0]

    const pairXY = getPairXYKey(generatedBlock.x, generatedBlock.y)
    expect(blockStore.emptyPairs.includes(pairXY)).equal(false)
  })

  it('Should not random if Game End', () => {
    const blockStore = useBlockStore()
    blockStore.isEndGame = true
    blockStore.randomBlock()
    expect(blockStore.blockList.length).equal(0)
  })
})

describe('Convert between Block 2D And Array', () => {
  beforeEach(() => {
    const pinia = createPinia()
    app.use(pinia)
    setActivePinia(pinia)
  })

  const array2D = [
    [0, 0],
    [0, 2]
  ]

  const array = [new Block(1, 1, 2)]

  it('Should convert block 2D to array', () => {
    const resultArray = convert2DToBlockArray(array2D).map(getBlockCompareProperties)
    const expectArray = array.map(getBlockCompareProperties)

    expect(isEqual(resultArray, expectArray)).equal(true)
  })

  it('Should convert block array to 2D', () => {
    const result2DArray = convertArrayBlockTo2D(array, 2)

    expect(isEqual(result2DArray, array2D)).equal(true)
  })
})

describe('Move Block', () => {
  let blockStore: ReturnType<typeof useBlockStore>
  beforeEach(() => {
    const pinia = createPinia()
    app.use(pinia)
    setActivePinia(pinia)
    blockStore = useBlockStore()

    blockStore.isEndGame = true
  })

  const array2D = [
    [0, 0, 0, 0],
    [0, 0, 2, 0],
    [0, 2, 0, 0],
    [0, 0, 0, 2]
  ]

  it.skip('Should move block to top', () => {
    const expectResult = [
      [0, 2, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]

    blockStore.blocks = convert2DToBlockArray(array2D)
    blockStore.move(Direction.UP)

    const to2DArray = convertArrayBlockTo2D(blockStore.blocks)

    expect(isEqual(expectResult, to2DArray)).equal(true)
  })

  it.skip('Should move block to left', () => {
    const expectResult = [
      [0, 0, 0, 0],
      [2, 0, 0, 0],
      [2, 0, 0, 0],
      [2, 0, 0, 0]
    ]

    const blockStore = useBlockStore()
    blockStore.blocks = convert2DToBlockArray(array2D)
    blockStore.move(Direction.LEFT)

    const to2DArray = convertArrayBlockTo2D(blockStore.blocks)

    expect(isEqual(expectResult, to2DArray)).equal(true)
  })

  it.skip('Should move block to right', () => {
    const expectResult = [
      [0, 0, 0, 0],
      [0, 0, 0, 2],
      [0, 0, 0, 2],
      [0, 0, 0, 2]
    ]

    const blockStore = useBlockStore()
    blockStore.blocks = convert2DToBlockArray(array2D)
    blockStore.move(Direction.RIGHT)

    const to2DArray = convertArrayBlockTo2D(blockStore.blocks)

    expect(isEqual(expectResult, to2DArray)).equal(true)
  })

  it.skip('Should move block to down', () => {
    const expectResult = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 2, 2, 2]
    ]

    const blockStore = useBlockStore()
    blockStore.blocks = convert2DToBlockArray(array2D)
    blockStore.move(Direction.DOWN)

    const to2DArray = convertArrayBlockTo2D(blockStore.blocks)

    expect(isEqual(expectResult, to2DArray)).equal(true)
  })

  it('Should merge block', () => {
    const blockStore = useBlockStore()

    MERGE_BLOCK_DATA_SOURCE.forEach((item) => {
      blockStore.blocks = convert2DToBlockArray(item.input)
      blockStore.move(item.direction)

      const to2DArray = convertArrayBlockTo2D(blockStore.blocks, item.input[0].length)

      const success = isEqual(item.output, to2DArray)

      if (!success) {
        console.log('input', item.input)
        console.log('result', to2DArray)
        console.log('expect', item.output)
        console.log('Direction', item.direction)
        console.log('------')
      }

      expect(success).equal(true)
    })
  })
})

describe('Check end game', () => {
    let blockStore: ReturnType<typeof useBlockStore>
    beforeEach(() => {
      const pinia = createPinia()
      app.use(pinia)
      setActivePinia(pinia)
      blockStore = useBlockStore()
    })

    const array2D = [
      [64, 32, 2, 16],
      [128, 64, 16, 8],
      [4, 16, 8, 4],
      [2, 8, 2, 2],
    ]

    it('Should check endGame to false', () => {
      blockStore.blocks = convert2DToBlockArray(array2D)
      // blockStore.move(Direction.UP);
      blockStore.checkEndGame();
      expect(blockStore.isEndGame).equal(false);
    })
})