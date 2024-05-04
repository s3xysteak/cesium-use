# viewerStore

The `viewerStore` section is the most special one because there is no function named `viewerStore`; it's actually a collective term for a series of functions.

- **get**
  - `getViewer`: Used to retrieve the viewer instance. It first attempts to get the viewer instance through dependency injection. If that fails, it tries to get the viewer instance through a module-level global variable. If both attempts fail, an error is thrown.
- **set**
  - `setViewer`: Stores the viewer instance using a module-level global variable.
  - `useViewerProvider`: Passes the viewer instance to child components through dependency injection.

## Usage

Assuming there is such a directory structure:

```md
- earth-container.vue
- Earth
  - Earth.vue
```

Code in `earth-container.vue`:

```vue {10,15}
<script setup>
import * as Cesium from 'cesium'
import Earth from './Earth/Earth.vue'

const isViewerMounted = ref(false)
const viewerContainer = ref()
onMounted(() => {
  const viewer = new Cesium.Viewer(viewerContainer)

  setViewer(viewer)
  isViewerMounted.value = true
})

// const viewer = shallowRef()
// useViewerProvider(viewer)
// onMounted(() => {
//   viewer.value = new Cesium.Viewer(viewerContainer)

//   isViewerMounted.value = true
// })
</script>

<template>
  <div>
    <div ref="viewerContainer" />

    <Earth v-if="isViewerMounted" />
  </div>
</template>
```

Code in `Earth.vue` :

```vue {3}
<script setup>
import * as Cesium from 'cesium'
const viewer = getViewer()
console.log(viewer instanceof Cesium.Viewer) // true
</script>

<template>
  <div />
</template>
```

You can also call `getViewer` in your JavaScript code, just make sure that the **context in which this function is called** has access to the viewer instance. This can be very convenient when writing functions or organizing your code structure.

```js
// utils/doSomething.js
export function doSomething() {
  const viewer = getViewer()
  // ...
}
```

```vue
<script setup>
import { doSomething } from '@/utils/doSomething.js'

// If `getViewer()` can be executed correctly here.
getViewer()
// Then the internal `getViewer()` within the function should also be able to execute correctly.
doSomething()
</script>

<template>
  <div />
</template>
```

In fact, this is how the majority of functions in Cesium Use are implemented.

## Type Declaration

:::details

```ts
export const getViewer: () => Viewer

export const setViewer: (v: Viewer) => void

export const useViewerProvider: (v: ShallowRef<Viewer>) => void
```

:::

### Corrections Guide

Errors are typically caused by `getViewer`, which throws an error when attempting to retrieve the viewer instance.

::: danger Error Message
Cannot get viewer.
:::

Here are some common ways to check for error causes.

### Viewer Not Instantiated Yet

In Vue, the `setup` lifecycle is the earliest phase, with the DOM being mounted afterward. If you instantiate the viewer in `onMounted` and then try to get the instance within the same component, errors are likely to occur.

```vue {9-10,13-15}
<script setup>
import * as Cesium from 'cesium'

const container = ref()
onMounted(async () => {
  const viewer = new Cesium.Viewer(container.value)
})

// The container is not mounted yet!
const viewer = getViewer()

onMounted(() => {
  // The container is now mounted.
  // However, the callback for instantiating the viewer is asynchronous, so synchronous tasks here will execute before it!
  const viewer = getViewer()
})
</script>

<template>
  <div ref="container" />
</template>
```

### Outside the `setup` Call Stack

`useViewerProvider` is implemented using Vue's dependency injection feature, so it must adhere to the conditions of dependency injection. This means that `getViewer` must be executed within the `setup` call stack to correctly obtain the viewer instance. Assuming the parent component correctly provides the viewer instance through `useViewerProvider`:

```vue
<script setup>
// Correct
const viewer = getViewer()

async function getData() {
  // Incorrect, as this is within an asynchronous task
  const viewer = getViewer()
  // ...
}
getData()

onMounted(() => {
  // Incorrect, as this is within the onMounted lifecycle
  const viewer = getViewer()
})
</script>
```

For more information on dependency injection, please refer to the [Vue official documentation](https://cn.vuejs.org/guide/components/provide-inject.html).
