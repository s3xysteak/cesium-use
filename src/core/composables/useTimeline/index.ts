import * as Cesium from 'cesium'
import { readonly, ref, watchEffect } from 'vue'
import { useEventHandler, useViewer } from '~/index'

export function useTimeline(viewer = useViewer()) {
  const getUnix = (time: Cesium.JulianDate) => Cesium.JulianDate.toDate(time).getTime()
  const getIsPaused = () => !viewer.clock.shouldAnimate || !viewer.clock.canAnimate

  /** Unix timestamp in milliseconds */
  const currentTime = ref<number>(getUnix(viewer.clock.currentTime))
  watchEffect(() => {
    viewer.clock.currentTime = Cesium.JulianDate.fromDate(new Date(currentTime.value))
  })

  const rate = ref<number>(viewer.clock.multiplier)
  watchEffect(() => {
    viewer.clock.multiplier = rate.value
  })

  const startTime = ref<number>(getUnix(viewer.clock.startTime))
  watchEffect(() => {
    viewer.clock.startTime = Cesium.JulianDate.fromDate(new Date(startTime.value))
  })

  const stopTime = ref<number>(getUnix(viewer.clock.stopTime))
  watchEffect(() => {
    viewer.clock.stopTime = Cesium.JulianDate.fromDate(new Date(stopTime.value))
  })

  const paused = ref<boolean>(getIsPaused())

  const onTick = useEventHandler(viewer.clock.onTick)
  onTick.add(() => {
    currentTime.value = getUnix(viewer.clock.currentTime)
    startTime.value = getUnix(viewer.clock.startTime)
    stopTime.value = getUnix(viewer.clock.stopTime)

    paused.value = getIsPaused()

    rate.value = viewer.clock.multiplier
  })

  const play = () => {
    viewer.clock.shouldAnimate = true
  }
  const pause = () => {
    viewer.clock.shouldAnimate = false
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
