<script setup lang="tsx">
import { computed, defineComponent, ref } from 'vue'
import Located from './Located.vue'

const show = ref(true)
const lon = ref('-100')
const lat = ref('40')
function getNum(num: any, init: number) {
  return Number.isNaN(Number(num)) ? init : Number(num)
}
const coordinate = computed(() => [
  getNum(lon.value, -100),
  getNum(lat.value, 40),
])

const MyButton = defineComponent((_, { slots }) => () => (
  <button class="btn">{() => slots.default?.()}</button>
))
</script>

<template>
  <div absolute top-10 left-10 flex="~ col">
    <input v-model="lon" placeholder="lon">
    <input v-model="lat" placeholder="lat">
  </div>

  <Located
    v-model="show"
    :as="MyButton"
    placement="top"
    :coordinate="coordinate"
  >
    <div>
      hello world!
    </div>
  </Located>
</template>
