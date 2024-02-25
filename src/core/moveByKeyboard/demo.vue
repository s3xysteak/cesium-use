<script setup lang="ts">
import { ref, computed } from 'vue'
import { moveByKeyboard } from '.'

const input = ref<string>('10')
const speed = computed(() =>
  Number.isNaN(Number(input.value)) ? 4 : Number(input.value)
)
moveByKeyboard({ distancePerFrame: speed })
</script>

<template>
  <div absolute top-0 left-1>
    <input v-model="input" />
  </div>
</template>
