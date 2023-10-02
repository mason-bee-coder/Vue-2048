<script setup lang="ts">
import { useReset } from '@/composables/useReset'
import useBlockStore from '@/stores/block'
import useScoreStore from '@/stores/score'

const blockStore = useBlockStore()
const scoreStore = useScoreStore()
const { reset } = useReset()

const onReset = () => {
  window.gtag?.('event', 'Replay', {
    score: scoreStore.score
  })
  reset()
}
</script>

<template>
  <div class="end-game" :class="blockStore.isEndGame ? 'show' : ''">
    <h4 class="title">Game over!</h4>
    <button class="button-common" @click="onReset">Replay</button>
  </div>
</template>

<style lang="sass">
.end-game
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  position: relative
  opacity: 0
  visibility: hidden
  transition: all 0.4s linear

  &.show
    visibility: visible
    opacity: 1

  &::before
    content: ''
    display: block
    background-color: #a2a2a2
    opacity: 0.75
    filter: blur(5px)
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index: -1
.title
  font-weight: 800
  font-size: 2.25rem
  margin-bottom: 0.75rem
  color: #003366
  user-select: none
</style>
