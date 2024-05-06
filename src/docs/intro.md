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

## Naming Convention

`cesium-use` follows the `composable` naming convention for functions.

1. All functions starting with `use` are **definitely** composable functions, which means you should call them within the `setup` call stack.
2. All functions not starting with `use` are **definitely NOT** composable functions.

## Viewer Management

For convenient Viewer instance management, Cesium Use provides three methods for use.

- `getViewer` to retrieve the viewer instance.
- `setViewer` to save the viewer through a module-level top-level variable.
- `useViewerProvider` to utilize Vue's dependency injection for viewer transfer between components.

Unlike practices in many Vue libraries, Cesium Use **recommends** using `setViewer` over dependency injection-based `useViewerProvider`.

::: warning
`useViewerProvider` is not stable yet and in the future, `setViewer` will be deprecated in favor of the stable `useViewerProvider`.
:::

For more related content, refer to [viewerStore](composables/viewerStore.md).
