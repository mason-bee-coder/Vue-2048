import { defineStore } from 'pinia'
import { ref } from 'vue'

const useScoreStore = defineStore('store', () => {
  const score = ref<number>(0)

  const increase = (value: number) => {
    score.value += value
  }

  function $reset() {
    score.value = 0
  }

  return { score, increase, $reset }
})

export default useScoreStore
