<script setup lang="ts">
import GridUI from '@/components/GridUI.vue'
import StageBlock from '@/components/StageBlock.vue'
import EndGame from './EndGame.vue'
import ScoreAreaVue from './ScoreArea.vue'
import { useReset } from '@/composables/useReset'
import { onMounted } from 'vue'
import useBlockStore from '@/stores/block'
import FooterComp from './FooterComp.vue'

const blockStore = useBlockStore()
const { reset } = useReset()

onMounted(() => {
  blockStore.init()
})
</script>

<template>
  <div class="play-stage">
    <div class="header-wrapper">
      <div class="header">
        <div class="logo">2048</div>
        <ScoreAreaVue />
      </div>

      <div class="new-game-wrapper">
        <button class="button-common" @click="reset">New Game</button>
      </div>
    </div>

    <div class="play-area">
      <GridUI v-once> </GridUI>
      <StageBlock />
      <EndGame />
    </div>
  </div>

  <FooterComp v-once />
</template>

<style scoped lang="sass">

.play-stage
  display: flex
  flex-direction: column
  align-items: center
  padding: 2rem 1.5rem

.header-wrapper
  width: 100%
  max-width: 400px

.header
  display: flex
  align-items: center
  justify-content: space-between
  user-select: none

.logo
  font-size: 2.5rem
  font-weight: 800
  color: var(--blue)

.new-game-wrapper
  display: flex
  justify-content: flex-end

  button
    margin: 1rem 1rem 0 0

.play-area
  position: relative
  display: inline-block
  margin-top: 5rem

  &:deep(.stage-wrapper)
    z-index: 10
    position: absolute
    top: 0
    left: 0

  &:deep(.end-game)
    position: absolute
    top: 0
    left: 0
    z-index: 20
    width: 100%
    height: 100%
</style>
