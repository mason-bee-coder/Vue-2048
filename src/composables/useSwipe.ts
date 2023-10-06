import { throttle } from 'lodash'
import { onMounted, ref, shallowRef } from 'vue'
export type SwipeCallback = (event: TouchEvent) => void
export type SwipeOptions = {
  directinoal_threshold: number // Pixels offset to trigger swipe
}
export const useSwipe = (
  touchableElement: HTMLElement | null = null,
  options = ref({
    directinoal_threshold: 40
  })
) => {
  const touchStartX = shallowRef(0)
  const touchEndX = shallowRef(0)
  const touchStartY = shallowRef(0)
  const touchEndY = shallowRef(0)

  onMounted(() => {
    if (!touchableElement) touchableElement = document.body
    touchableElement.addEventListener(
      'touchstart',
      (event) => {
        touchStartX.value = event.changedTouches[0].screenX
        touchStartY.value = event.changedTouches[0].screenY
      },
      false
    )

    touchableElement.addEventListener(
      'touchend',
      (event) => {
        touchEndX.value = event.changedTouches[0].screenX
        touchEndY.value = event.changedTouches[0].screenY
        handleGesture(event)
      },
      false
    )
  })

  const onSwipeLeft: Array<SwipeCallback> = []
  const onSwipeRight: Array<SwipeCallback> = []
  const onSwipeUp: Array<SwipeCallback> = []
  const onSwipeDown: Array<SwipeCallback> = []
  const onTap: Array<SwipeCallback> = []

  const addEventListener = (arr: Array<SwipeCallback>, callback: SwipeCallback) => {
    arr.push(callback)
  }

  const handleGesture = (event: TouchEvent) => {
    if (
      touchEndX.value < touchStartX.value &&
      Math.max(touchStartY.value, touchEndY.value) - Math.min(touchStartY.value, touchEndY.value) <
        options.value.directinoal_threshold
    ) {
      onSwipeLeft.forEach((callback) => callback(event))
    }

    if (
      touchEndX.value > touchStartX.value &&
      Math.max(touchStartY.value, touchEndY.value) - Math.min(touchStartY.value, touchEndY.value) <
        options.value.directinoal_threshold
    ) {
      onSwipeRight.forEach((callback) => callback(event))
    }

    if (
      touchEndY.value < touchStartY.value &&
      Math.max(touchStartX.value, touchEndX.value) - Math.min(touchStartX.value, touchEndX.value) <
        options.value.directinoal_threshold
    ) {
      onSwipeUp.forEach((callback) => callback(event))
    }

    if (
      touchEndY.value > touchStartY.value &&
      Math.max(touchStartX.value, touchEndX.value) - Math.min(touchStartX.value, touchEndX.value) <
        options.value.directinoal_threshold
    ) {
      onSwipeDown.forEach((callback) => callback(event))
    }

    if (touchEndY.value === touchStartY.value) {
      onTap.forEach((callback) => callback(event))
    }
  }
  return {
    onSwipeLeft: (callback: SwipeCallback) =>
      addEventListener(onSwipeLeft, throttle(callback, 300)),
    onSwipeRight: (callback: SwipeCallback) =>
      addEventListener(onSwipeRight, throttle(callback, 300)),
    onSwipeUp: (callback: SwipeCallback) => addEventListener(onSwipeUp, throttle(callback, 300)),
    onSwipeDown: (callback: SwipeCallback) =>
      addEventListener(onSwipeDown, throttle(callback, 300)),
    onTap: (callback: SwipeCallback) => addEventListener(onTap, throttle(callback, 300))
  }
}
