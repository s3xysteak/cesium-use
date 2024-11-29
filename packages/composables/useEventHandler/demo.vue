<script setup lang="ts">
import { noop } from '@s3xysteak/utils'
import { useViewer } from '~composables/useViewer'
import * as Cesium from 'cesium'
import { ref } from 'vue'
import { useEventHandler } from '~/index'

const viewer = useViewer()
function addPoint(e: { position: any }) {
  viewer.entities.add({
    position: viewer.scene.pickPosition(e.position),
    point: {
      pixelSize: 20,
      outlineWidth: 5,
      color: Cesium.Color.fromRandom({ alpha: 1 }),
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
    },
  })
}
const eventHandler = useEventHandler()
eventHandler((e) => {
  addPoint(e)
}, Cesium.ScreenSpaceEventType.RIGHT_CLICK)

// How to use `useEventHandler` without vue instance

function delay(time: number) {
  return new Promise((res) => {
    setTimeout(res, time)
  })
}

const clickText = ref('left click do not work now')
async function onClick() {
  clickText.value = 'left click works now!'

  const handler = eventHandler(addPoint, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  await delay(5000)
  handler.destroy()

  clickText.value = 'left click do not work now!'
}

const onPreRender = useEventHandler(viewer.scene.preRender)

const num = ref(100)

interface UseTweenNumberOptions {
  from: number
  to: number
  duration: number
  onUpdated?: (value: number) => void
  onComplete?: () => void
}
const easeOut = (t: number) => 1 - (1 - t) ** 5
function tweenNumber({
  from,
  to,
  duration,
  onUpdated = noop,
  onComplete = noop,
}: UseTweenNumberOptions) {
  const start = performance.now()

  const remove = onPreRender(() => {
    const now = performance.now()
    const progress = Math.min(now - start, duration)
    const value = from + (to - from) * easeOut(progress / duration)

    if (progress > duration)
      return stop()

    onUpdated(value)
  })

  function stop() {
    remove()
    onComplete()
  }

  return stop
}
</script>

<template>
  <div panel flex>
    <section>
      <button btn @click="onClick">
        {{ clickText }}
      </button>

      <div b-t="1 solid light" pt-2 mt-2>
        tips:
        <p>Right click to add point!</p>
      </div>
    </section>

    <section m-l-xl p-l-xl b-l="1 solid gray">
      {{ num.toFixed(2) }}
      <button ml-2 btn @click="tweenNumber({ from: num, to: num + 10, duration: 1000, onUpdated: val => { num = val } })">
        + 10
      </button>
      <button ml-2 btn @click="tweenNumber({ from: num, to: num - 10, duration: 1000, onUpdated: val => { num = val } })">
        - 10
      </button>
      <button ml-2 btn @click="tweenNumber({ from: num, to: 10, duration: 1000, onUpdated: val => { num = val } })">
        = 10
      </button>

      <div b-t="1 solid light" pt-2 mt-2>
        tips:
        <p>Number animation based on `Scene.preRender` !</p>
      </div>
    </section>
  </div>
</template>
