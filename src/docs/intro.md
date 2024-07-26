# Introduction

Cesium Use is a Vue-based CesiumJS utility library that offers a range of functions and components to simplify the development process based on CesiumJS, providing a better development experience and higher development efficiency.

::: tip Prerequisite Knowledge

- `JavaScript`
- `Vue`
- `CesiumJS`

Before using Cesium Use, it is assumed that you have a basic understanding of them.
:::

## Example

Example of initializing Viewer：

```vue
<script setup>
import Comp from './Comp.vue'
const container = ref(null)

// Initialize Viewer
const { isMounted } = useViewerProvider(() => new Cesium.Viewer(container.value))
</script>

<template>
  <div ref="container" />
  <Comp v-if="isMounted" />
</template>
```

Example of using Viewer:

```vue {6,8,13,20-22}
<script setup>
// Comp.vue
import * as Cesium from 'cesium'
import { Located } from 'cesium-use'

// Auto import import { useViewer, useEventHandler } from 'cesium-use'

const viewer = useViewer() // Get Viewer injected from parent component.

const show = ref(true)
const pos = shallowRef()

const eventHandler = useEventHandler()
eventHandler(({ position }) => {
  pos.value = viewer.scene.pickPosition(position)
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

- `useViewer()` get `Viewer` injected from parent component, which is almost equal to `inject('viewer-key')`.

- `useEventHandler` create a factory function of `ScreenSpaceEventHandler`.
:::

The above example demonstrates several key features of Cesium Use:

- **Native Development Experience:** Strives to provide a development experience closely resembling native CesiumJS.
- **Functions and Components:** Offers a range of functions and components to cover various use cases.
- **Automatic Import:** Supports `unplugin-auto-import`, eliminating the need for manually importing provided methods.
- **Viewer Management:** Provides functions for managing the Viewer, making it easy to obtain the Viewer instance.

::: tip
[Click here](https://stackblitz.com/edit/vitejs-vite-t6qklc?file=src%2FComp.vue) to play the example above online!
:::

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

## Naming Convention

`cesium-use` follows the `composable` naming convention for functions.

1. All functions starting with `use` are **definitely** composable functions, which means you should call them within the `setup` call stack.
2. All functions not starting with `use` are **definitely NOT** composable functions.

## Viewer Management

For convenient Viewer instance management, Cesium Use provides two methods for use.

- `useViewer` Get viewer instance by `provide / inject`.
- `useViewerProvider` Inject viewer instance by `provide / inject`.

For more related content, refer to [useViewer](composables/useViewer.md).
