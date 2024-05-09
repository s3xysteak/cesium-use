<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMoveByKeyboard } from '.'

const input = ref<string>('10')
const speed = computed(() =>
  Number.isNaN(Number(input.value)) ? 4 : Number(input.value),
)
useMoveByKeyboard({
  distancePerFrame: speed,
  keybinding: {
    forward: 'ArrowUp',
    backward: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',
  },
})
</script>

<template>
  <div absolute top-0 left-1>
    <input v-model="input">
  </div>
</template>
