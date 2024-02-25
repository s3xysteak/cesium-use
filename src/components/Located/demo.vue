<script setup lang="tsx">
import { ref, computed, defineComponent } from 'vue'
import Located from './Located.vue'

const show = ref(true)
const lon = ref('-100')
const lat = ref('40')
const getNum = (num: any, init: number) =>
  Number.isNaN(Number(num)) ? init : Number(num)
const coordinate = computed(() => [
  getNum(lon.value, -100),
  getNum(lat.value, 40)
])

const MyButton = defineComponent((_, { slots }) => () => (
  <button class="bg-indigo rounded-xl">{() => slots.default?.()}</button>
))
</script>

<template>
  <div absolute top-10 left-10 flex="~ col">
    <input placeholder="lon" v-model="lon" />
    <input placeholder="lat" v-model="lat" />
  </div>

  <Located
    v-model="show"
    :as="MyButton"
    placement="top"
    :coordinate="coordinate"
  >
    <div h-10 w-12 rounded>hello world!</div>
  </Located>
</template>
