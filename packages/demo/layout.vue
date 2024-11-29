<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const routes = router
  .getRoutes()
  .map(item => item.name)
  .filter(
    item =>
      typeof item === 'string'
      && !['layout', 'home', 'container'].includes(item),
  ) as string[]

function onClick(name: string) {
  router.push({ name })
}

const search = ref('')
function isShow(name: string) {
  return search.value === '' || name.toLowerCase().includes(search.value.toLowerCase())
}
</script>

<template>
  <div pt-16>
    <header all:transition px-15vw py-lg>
      <input
        v-model="search"
        placeholder="search..."
        h-10
        w-65
        bg-slate-2
        px-4
        leading-4
        rounded-full
        type="text"
      >
    </header>
    <main
      all:transition
      px-15vw
      py-lg
      grid="~ gap-8 lg:cols-4 md:cols-3 sm:cols-2"
    >
      <div
        v-for="item in routes"
        v-show="isShow(item)"
        :key="item"
        class="group"
        select-none
        cursor-pointer
        box-border
        h-45
        @click="onClick(item)"
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
    </main>
  </div>
</template>
