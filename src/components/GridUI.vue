<script setup lang="ts">
import { GRID_SIZE, GRID_ITEM_SIZE, GRID_GAP, GRID_BORDER } from '@/contants'
</script>

<template>
  <div class="grid-wrapper">
    <div
      class="grid"
      :style="{
        gridTemplateColumns: `repeat(${GRID_SIZE}, auto)`,
        gap: `${GRID_GAP}px`,
        border: `${GRID_BORDER}px solid var(--blue)`
      }"
    >
      <div
        class="grid-item"
        v-for="(i, index) in GRID_SIZE * GRID_SIZE"
        :key="index"
        :style="{
          width: `${GRID_ITEM_SIZE}px`,
          height: `${GRID_ITEM_SIZE}px`
        }"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="sass">

.grid-wrapper
  position: relative
  z-index: 10
  display: inline-block

.grid
  display: grid
  width: fit-content
  background-color: var(--blue)
  border-radius: 8px

.grid-item
  background-color: #afcab5
  border-radius: 4px

.grid-wrapper
    position: relative
</style>
