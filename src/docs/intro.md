# Introduction

Cesium Use is a Vue-based CesiumJS utility library that offers a range of functions and components to simplify the development process based on CesiumJS, providing a better development experience and more powerful features.

::: tip Prerequisite Knowledge

- `JavaScript`
- `Vue`
- `CesiumJS`

Before using Cesium Use, it is assumed that you have a basic understanding of them.
:::

## Example

```vue {5,7,12,18-20}
<script setup>
import * as Cesium from 'cesium'
import { Located } from 'cesium-use'

// Automatically imported: import { getViewer, useEvent } from 'cesium-use'

const viewer = getViewer()

const show = ref(true)
const pos = shallowRef()

useEvent((e) => {
  pos.value = viewer.scene.pickPosition(e.position)
}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
</script>

<template>
  <Located v-model="show" :coordinate="pos">
    <div>I am Cesium Use!</div>
  </Located>
</template>
```

::: details Code Explanation
When clicking on the Earth in Cesium, a window displaying "I am Cesium Use!" will be fixed at the clicked coordinates.
:::

The above example demonstrates several key features of Cesium Use:

- **Native Development Experience:** Strives to provide a development experience closely resembling native CesiumJS.
- **Functions and Components:** Offers a range of functions and components to cover various use cases.
- **Automatic Import:** Supports `unplugin-auto-import`, eliminating the need for manually importing provided methods.
- **Viewer Management:** Provides functions for managing the Viewer, making it easy to obtain the Viewer instance.
- **Type Support:** Developed using TypeScript, Cesium Use aims to provide an equally comfortable development experience for both TypeScript and JavaScript users.

## Reactive Support

Cesium Use inherently fully supports reactive passing of parameters in getter style. All parameters expecting reactive variables can use the following standardized variables:

- Primitive values.
- Basic reactive variables, such as values wrapped in `ref`.
- Getter style, such as `() => val`.

Example:

```js
import { func } from 'cesium-use' // This function doesn't actually exist; this is just an example.

const valRaw = 1 // Primitive value
func(valRaw)

const valRef = ref(1) // Reactive
func(valRef)

const valGetter = 1
func(() => valGetter) // Getter
```

## Viewer Management

### viewerStore Function

For convenient Viewer instance management, Cesium Use provides three methods for use.

- `getViewer` to retrieve the viewer instance.
- `setViewer` to save the viewer through a module-level top-level variable.
- `useViewerProvider` to utilize Vue's dependency injection for viewer transfer between components.

Unlike practices in many Vue libraries, Cesium Use **recommends** using `setViewer` over dependency injection-based `useViewerProvider`. This is because dependency injection can only be used within the setup call stack, which makes it challenging to ensure all implementations are completed within the same call stack in CesiumJS.

For more related content, refer to [viewerStore](core/viewerStore.md).

### Best Practices for Component Structure

It is recommended to have a parent component that houses the viewer, ensuring that child components render after the viewer is mounted.
For example, this structure:

```md
- earth-container.vue
- Earth.vue
```

In `earth-container.vue`:

```vue {5,10-11,19}
<script setup>
import * as Cesium from 'cesium'
import Earth from './Earth.vue'

const isViewerMounted = ref(false)
const viewerContainer = ref()
onMounted(() => {
  const viewer = new Cesium.Viewer(viewerContainer)

  setViewer(viewer)
  isViewerMounted.value = true
})
</script>

<template>
  <div>
    <div ref="viewerContainer" />

    <Earth v-if="isViewerMounted" />
  </div>
</template>
```

In `Earth.vue`:

```vue
<script setup>
import * as Cesium from 'cesium'
const viewer = getViewer()
console.log(viewer instanceof Cesium.Viewer) // true
</script>

<template>
  <div />
</template>
```

In essence, it is strongly recommended to initialize the viewer in a separate component.
Using the example of `earth-container.vue`, this component solely handles the viewer instantiation and renders child components after the viewer is instantiated. Subsequent operations are carried out in `Earth.vue` and other child components. This approach ensures smooth retrieval of the viewer instance instantiated in the container component in subsequent code.
