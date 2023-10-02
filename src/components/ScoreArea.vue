<script setup lang="ts">
import useScoreStore from '@/stores/score'
import { ref, watchEffect } from 'vue'

const BEST_KEY = 'best'
const scoreStore = useScoreStore()
const best = ref(Number(localStorage.getItem(BEST_KEY) || 0))

watchEffect(() => {
  if (scoreStore.score > best.value) {
    best.value = scoreStore.score
    localStorage.setItem(BEST_KEY, best.value.toString())
  }
})
</script>

<template>
  <div class="wrapper">
    <div class="score-box">
      <p class="title">SCORE</p>
      <p class="score">{{ scoreStore.score }}</p>
    </div>

    <div class="gap"></div>

    <div class="score-box">
      <p class="title">BEST</p>
      <p class="score">{{ best }}</p>
    </div>
  </div>
</template>

<style scoped lang="sass">
.wrapper
    display: flex

.gap
    width: 3px
    height: 2rem
    margin-top: 1.1rem
    margin: 1rem 1.5rem 0
    background-color: var(--green)

.score-box
    padding: 0.5rem 0
    text-align: center

.title
    font-weight: 800
    font-size: 0.675rem
    margin-bottom: 0.4rem
    color: var(--blue-secondary)
.score
    font-weight: 800
    font-size: 1.675rem
    color: var(--green)
    line-height: 1
</style>
