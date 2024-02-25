<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const routes = router
  .getRoutes()
  .map(item => item.name)
  .filter(
    item =>
      typeof item === 'string' &&
      !['layout', 'home', 'container'].includes(item)
  ) as string[]

function onClick(name: string) {
  router.push({ name })
}
</script>

<template>
  <div all:transition px-15vw py-lg flex="~ wrap">
    <div
      @click="onClick(item)"
      class="group"
      select-none
      cursor-pointer
      box-border
      p-4
      h-47.5
      w="[calc(100%/4)]"
      v-for="item in routes"
      :key="item"
    >
      <div
        group-hover:scale-110
        bg="#f6f6ff"
        h-full
        w-full
        shadow-md
        rounded-lg
        flex="~ items-center justify-center"
        text-lg
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>
