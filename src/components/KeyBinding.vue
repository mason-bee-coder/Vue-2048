<script setup lang="ts">
import { useSwipe } from '@/composables/useSwipe'
import { Direction } from '@/models/direction'
import useBlockStore from '@/stores/block'
import { debounce } from 'lodash'
import { onMounted } from 'vue'

const blockStore = useBlockStore()

const { onSwipeLeft, onSwipeRight, onSwipeDown, onSwipeUp } = useSwipe(document.body)

const preventEndGameAction = (callback: Function) => () => {
  if (blockStore.isEndGame) {
    return
  }

  callback()
}

onSwipeLeft(
  preventEndGameAction(() => {
    blockStore.move(Direction.LEFT)
  })
)

onSwipeRight(
  preventEndGameAction(() => {
    blockStore.move(Direction.RIGHT)
  })
)

onSwipeDown(
  preventEndGameAction(() => {
    blockStore.move(Direction.DOWN)
  })
)

onSwipeUp(
  preventEndGameAction(() => {
    blockStore.move(Direction.UP)
  })
)

const onKeyDown = (event: KeyboardEvent) => {
  if (blockStore.isEndGame) {
    return
  }

  switch (event.code) {
    case 'ArrowLeft':
      //Left key
      blockStore.move(Direction.LEFT)
      break
    case 'ArrowUp':
      //Up key
      blockStore.move(Direction.UP)
      break
    case 'ArrowRight':
      //Right key
      blockStore.move(Direction.RIGHT)
      break
    case 'ArrowDown':
      //Down key
      blockStore.move(Direction.DOWN)
      break
  }
}

onMounted(() => {
  document.addEventListener('keydown', debounce(onKeyDown, 100))
})
</script>
