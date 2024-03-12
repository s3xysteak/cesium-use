# Located

Locate a DOM element on a coordinate.

## Usage

```vue
<script setup>
import { Located } from 'cesium-use'
import MyButton from './MyButton.vue'

const show = ref(true)
const pos = shallowRef([-100, 10])
</script>

<template>
  <Located
    v-model="show"
    :as="MyButton"
    placement="top"
    :coordinate="pos"
    :offset="{ top: 10, left: 20 }"
  >
    <div>hello world!</div>
  </Located>
</template>
```

Where:

- `v-model` binds a boolean value that controls the display and hiding of `Located`.
- `as` can change `Located` to the desired DOM, defaulting to `'div'`, or pass a component as shown in the example code.
- `placement` provides a series of preset positions, defaulting to `bottomRight`, indicating the DOM is positioned at the bottom right of the coordinates (i.e., the top left corner of the DOM is fixed on the coordinates).
- `coordinate` is used to control the fixed coordinates of `Located`.
- `offset` is used to adjust the positioning offset of the DOM. `top` and `left` are in CSS units.

## Type Declarations

:::details

```ts
interface Rect {
  width: number
  height: number
}

type Placement =
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'right'
  | 'bottomRight'
  | 'bottom'
  | 'bottomLeft'
  | 'left'

interface Props {
  coordinate: MaybeCartesian3OrLonLat

  /**
   * DOM element placement
   * @default 'bottomRight'
   */
  placement?: Placement

  /**
   * Dom css offset
   */
  offset?: Partial<{
    left: number
    top: number
  }>

  as?: string | Component
}
```

:::
