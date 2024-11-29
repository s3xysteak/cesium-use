<script setup lang="ts">
import { computed, ref } from 'vue'
import { editEntity } from '.'

const input1 = ref(`{
  id: '123-456-789',
  name: 'my-entity',
  position: 'where',
  label: { 
    text: 'hi' 
  },
}`)
const input2 = ref(`{ 
  position: 'here',
  label: { 
    font: 'bold' 
  },
  billboard: {
    image: 'a/b/c.jpg'
  }
}`)

function func(obj: string) {
  /* eslint-disable no-new-func */
  return (new Function(`return ${obj}`))()
}

const formatted = computed<string>((old) => {
  try {
    return JSON.stringify(
      editEntity(func(input1.value), func(input2.value)),
      null,
      2,
    )
  }
  catch {
    return old ?? ''
  }
})
</script>

<template>
  <div grid="~ cols-2">
    <div flex="~ col">
      <label>
        A:
        <textarea v-model="input1" cols="32" h-60 input />
      </label>

      <label>
        B:
        <textarea v-model="input2" cols="32" h-60 input />
      </label>
    </div>

    <pre>
      {{ formatted }}
    </pre>
  </div>
</template>
