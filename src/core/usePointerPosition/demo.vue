<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePointerPosition } from '@/index'

const input = ref('')
const throttle = computed(() =>
  Number.isNaN(Number(input.value)) ? 0 : Number(input.value),
)
const { alt, lat, lon } = usePointerPosition({
  throttle,
})
</script>

<template>
  <input v-model="input" placeholder="throttle interval..." absolute left-10 top-10>
  <div bg-light absolute left-10 top-30>
    <div>lon : {{ lon }}</div>
    <div>lat : {{ lat }}</div>
    <div>height : {{ alt }}</div>
  </div>
</template>
