import useBlockStore from '@/stores/block'
import useScoreStore from '@/stores/score'

export const useReset = () => {
  const blockStore = useBlockStore()
  const scoreStore = useScoreStore()

  const reset = () => {
    blockStore.$reset()
    scoreStore.$reset()
    blockStore.init()
  }

  return { reset }
}
