import * as Cesium from 'cesium'
import { readonly, ref, watchEffect } from 'vue'
import { useEventHandler, useViewer } from '~/index'

export function useTimeline(clock = useViewer().clock) {
  const getUnix = (time: Cesium.JulianDate) => Cesium.JulianDate.toDate(time).getTime()
  const getIsPaused = () => !clock.shouldAnimate || !clock.canAnimate

  /** Unix timestamp in milliseconds */
  const currentTime = ref<number>(getUnix(clock.currentTime))
  watchEffect(() => {
    clock.currentTime = Cesium.JulianDate.fromDate(new Date(currentTime.value))
  })

  const rate = ref<number>(clock.multiplier)
  watchEffect(() => {
    clock.multiplier = rate.value
  })

  const startTime = ref<number>(getUnix(clock.startTime))
  watchEffect(() => {
    clock.startTime = Cesium.JulianDate.fromDate(new Date(startTime.value))
  })

  const stopTime = ref<number>(getUnix(clock.stopTime))
  watchEffect(() => {
    clock.stopTime = Cesium.JulianDate.fromDate(new Date(stopTime.value))
  })

  const paused = ref<boolean>(getIsPaused())

  const onTick = useEventHandler(clock.onTick)
  onTick(() => {
    currentTime.value = getUnix(clock.currentTime)
    startTime.value = getUnix(clock.startTime)
    stopTime.value = getUnix(clock.stopTime)

    paused.value = getIsPaused()

    rate.value = clock.multiplier
  })

  const play = () => {
    clock.shouldAnimate = true
  }
  const pause = () => {
    clock.shouldAnimate = false
  }

  return {
    rate,
    paused: readonly(paused),
    currentTime,
    startTime,
    stopTime,
    play,
    pause,
  }
}
