# Introduction

Cesium Use is a Vue-based CesiumJS utility library that offers a range of functions and components to simplify the development process based on CesiumJS.

::: tip Prerequisite Knowledge

- `JavaScript`
- `Vue`
- `CesiumJS`

Before using Cesium Use, it is assumed that you have a basic understanding of them.
:::

## Example

Click on the earth to see the result!

<script setup>
import { defineAsyncComponent } from 'vue'
const Viewer = defineAsyncComponent(() => import('../.vitepress/components/Viewer.vue'))
const Demo = defineAsyncComponent(() => import('../.vitepress/components/IntroDemo.vue'))
</script>

<ClientOnly>
  <Suspense>
    <Viewer overflow-hidden>
      <Demo />
    </Viewer>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</ClientOnly>

::: details Code

The structure is:

```vue
<template>
  <Viewer>
    <Demo />
  </Viewer>
</template>
```

The code of `Viewer.vue` :

```vue
<script setup>
import { useViewerProvider } from 'cesium-use'

const container = useTemplateRef('container')
const { isMounted } = useViewerProvider(() => new Cesium.Viewer(container.value))
</script>

<template>
  <div relative>
    <div ref="container" h-full w-full />
    <slot v-if="isMounted" />
  </div>
</template>
```

And the code of `Demo.vue` :

```vue
<script setup>
import { Located, useEventHandler, useViewer } from 'cesium-use'

const viewer = useViewer()

const show = ref(true)
const pos = shallowRef()

const handler = useEventHandler()
handler(({ position }) => {
  pos.value = viewer.scene.pickPosition(position)
}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
</script>

<template>
  <Located v-model="show" :coordinate="pos">
    <div bg-gradient-to-r shadow-lg from-rose to-blue text-nowrap c-white rounded p-4>
      I am Cesium Use!
    </div>
  </Located>
</template>
```
:::

The above example demonstrates several key features of Cesium Use:

- **Native Development Experience:** Strives to provide a development experience closely resembling native CesiumJS.
- **Functions and Components:** Offers a range of functions and components to cover various use cases.
- **Automatic Import:** Supports `unplugin-auto-import`, eliminating the need for manually importing provided methods.
- **Viewer Management:** Provides functions for managing the Viewer, making it easy to obtain the Viewer instance.

::: tip
Play the example above online on [stackblitz](https://stackblitz.com/edit/vitejs-vite-t6qklc?file=src%2FDemo.vue)!
:::

## Naming Convention

`cesium-use` follows the `composable` naming convention for functions.

1. All functions starting with `use` are **definitely** composable functions, which means you should call them within the `setup` call stack.
2. All functions not starting with `use` are **definitely NOT** composable functions.

## Viewer Management

For convenient Viewer instance management, Cesium Use provides two methods for use.

- `useViewer` Get viewer instance by `provide / inject`.
- `useViewerProvider` Inject viewer instance by `provide / inject`.

For more related content, refer to [useViewer](composables/useViewer.md).
