<script setup lang="ts">
import type { Block } from '@/models/block'
import { GRID_GAP, GRID_ITEM_SIZE, GRID_BORDER } from '@/contants'
import useBlockStore from '@/stores/block'
import { computed, type ComputedRef } from 'vue'

const BLOCK_SIZE = GRID_ITEM_SIZE + 'px'

const blockStore = useBlockStore()

const blocksWithPosition: ComputedRef<Array<Block & { top: string; left: string }>> = computed(
  () => {
    return blockStore.blockList.map((item) => {
      const top = GRID_BORDER + item.y * (GRID_ITEM_SIZE + GRID_GAP) + 'px'
      const left = GRID_BORDER + item.x * (GRID_ITEM_SIZE + GRID_GAP) + 'px'

      return {
        ...item,
        top,
        left
      }
    })
  }
)
</script>

<template>
  <div class="stage-wrapper">
    <div
      v-for="block in blocksWithPosition"
      :key="block.id"
      :style="{
        backgroundColor: block.color,
        width: BLOCK_SIZE,
        height: BLOCK_SIZE,
        top: block.top,
        left: block.left,
        color: block.textColor
      }"
      class="block-item"
      :class="`${block.isMergeBlock ? 'block-merged' : ''} ${block.isNewBlock ? 'block-new' : ''}`"
    >
      {{ block.value }}
    </div>
  </div>
</template>

<style lang="sass">
@keyframes appear
  0%
    opacity: 0
    transform: scale(0)
  100%
    opacity: 1
    transform: scale(1)

@keyframes bulge
  0%
    transform: scale(1)
  50%
    transform: scale(1.1)
  100%
    transform: scale(1)

.stage-wrapper
  width: 100%
  height: 100%

.block-item
  position: absolute
  transition: 100ms ease-in-out
  display: flex
  justify-content: center
  align-items: center
  font-size: 1.5rem
  font-weight: bold
  border-radius: 4px
  transform: scale(1)

  &.block-new
    animation: appear 200ms ease 100ms
    animation-fill-mode: backwards

  &.block-merged
    animation: bulge 500ms ease 100ms
    animation-fill-mode: backwards
</style>
