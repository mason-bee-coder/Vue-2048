import { defineStore } from 'pinia'
import { computed, shallowRef } from 'vue'
import { Block } from '../models/block'
import { Direction, type Axis } from '@/models/direction'
import { PAIR_X_Y, getPairXYKey, getXYFromPair } from '@/models/grid'
import { genArray, hasPairInGrid } from '@/helper'
import { flatten, orderBy } from 'lodash'
import useScoreStore from './score'
import { GRID_SIZE, SCORE_THRESHOLD_RANDOM_BLOCK_VALUE } from '@/contants'

const useBlockStore = defineStore('blocks', () => {
  const blocks = shallowRef<Block[]>([])
  const scoreStore = useScoreStore()

  const isEndGame = shallowRef<boolean>(false)

  const emptyPairs = computed(() => {
    const currentPair = blocks.value.map((b) => getPairXYKey(b.x, b.y))
    const result = PAIR_X_Y.filter((i) => !currentPair.includes(i))
    return result
  })

  // todo: handle logic check endGame
  const checkEndGame = () => {
    if (emptyPairs.value.length) {
      return false
    }

    isEndGame.value = !hasPairInGrid(blocks.value)
  }

  const move = (direction: Direction) => {
    handleBeforeMove()

    const mainAxis: Axis = [Direction.DOWN, Direction.UP].includes(direction) ? 'y' : 'x'
    const sideAxis: Axis = mainAxis === 'x' ? 'y' : 'x'

    const arrayBlocks = genArray(GRID_SIZE).map((_, index) => {
      const blockWithSameSideAxis = blocks.value.filter((block) => block[sideAxis] === index)

      const orderType = [Direction.UP, Direction.LEFT].includes(direction) ? 'asc' : 'desc'
      const sortedByValue = orderBy(blockWithSameSideAxis, mainAxis, orderType)

      const newBlocks = handleMoveBlocks(sortedByValue, direction, mainAxis)
      return newBlocks
    })

    const newBlocks = flatten(arrayBlocks)

    blocks.value = newBlocks

    handleUpdateScore()
    handleCleanBlocks()
  }

  // Handle merge block, update [axis] value
  const handleMoveBlocks = (blocks: Block[], direction: Direction, axis: Axis): Block[] => {
    const newBlocks: Block[] = []
    let i = 0
    while (i < blocks.length) {
      const block = { ...blocks[i] }

      const isDecreaseAxisValue = [Direction.UP, Direction.LEFT].includes(direction)

      // ignore the disappear block to find out the real position
      const previousBlock = newBlocks
        .slice()
        .reverse()
        .find((block) => !block.willDisappear)

      // handle for the highest - first block of row / column
      if (!previousBlock) {
        // it's the threshold property value when we move with direction
        const threshold = isDecreaseAxisValue ? 0 : GRID_SIZE - 1
        block[axis] = threshold
        newBlocks.push(block)
        i++
        continue
      }

      const matchForMerge = !previousBlock.willMerge && previousBlock.value === block.value
      if (matchForMerge) {
        previousBlock.willMerge = true
        previousBlock.isMergeBlock = true
        block.willDisappear = true
        block[axis] = previousBlock[axis]
      } else {
        // if decrease axis value, next block should +1 to axis value
        const gap = isDecreaseAxisValue ? 1 : -1
        block[axis] = previousBlock[axis] + gap
      }

      newBlocks.push(block)
      i++
    }

    return newBlocks
  }

  const randomBlock = () => {
    if (isEndGame.value || !emptyPairs.value.length) {
      return
    }

    const randomIdx = Math.round(Math.random() * (emptyPairs.value.length - 1))
    const position = emptyPairs.value[randomIdx]
    const { x, y } = getXYFromPair(position)

    // handle block value
    let randomValue = 2
    if (scoreStore.score > SCORE_THRESHOLD_RANDOM_BLOCK_VALUE) {
      randomValue = Math.random() * 10 > 5 ? 2 : 4
    }

    const newBlock = new Block(x, y, randomValue, false, true)
    newBlock.isNewBlock = true
    blocks.value = [...blocks.value, newBlock]
  }

  // Gain score accoding merge blocks
  const handleUpdateScore = () => {
    const gain = blocks.value
      .filter((block) => !!block.willMerge)
      .reduce((memo, item) => {
        memo += item.value * 2
        return memo
      }, 0)

    scoreStore.increase(gain)
  }

  const handleBeforeMove = () => {
    // clean the UI effect properties
    const newBlocks = blocks.value.map((block) => ({
      ...block,
      isMergeBlock: false,
      isNewBlock: false
    }))

    blocks.value = newBlocks
  }

  const handleCleanBlocks = () => {
    blocks.value.map((block) => ({
      ...block,
      isMergeBlock: undefined
    }))

    try {
      const hasMerge = blocks.value.some((block) => block.willMerge)

      if (!hasMerge) {
        return
      }

      const newBlocks = blocks.value
        .filter((block) => !block.willDisappear)
        .map((block) => {
          // Create a new merge block so we can handle UI merge effect
          if (block.willMerge) {
            return new Block(block.x, block.y, block.value * 2, true)
          }

          return block
        })

      blocks.value = newBlocks
    } finally {
      // We always check end game
      randomBlock()
      checkEndGame()
    }
  }

  const blockList = computed(() => {
    return orderBy(blocks.value, 'id', 'asc')
  })

  function init() {
    randomBlock()
    randomBlock()
  }

  function $reset() {
    isEndGame.value = false
    blocks.value = []
  }

  return { init, blockList, isEndGame, checkEndGame, move, randomBlock, emptyPairs, blocks, $reset }
})

export default useBlockStore
