# Located

Locate a DOM element on a coordinate.

For more detailed type declarations and source code, refer to [useLocated](/composables/useLocated.md) 。

| Name                | Type                                                  | Default       |
| ------------------- | ----------------------------------------------------- | ------------- |
| (v-model)modelValue | boolean                                               | true          |
| coordinate          | Nullable\<Cartesian3 \| MaybeCoordinates\>            | **required**  |
| placement?          | Nullable\<UseLocatedPlacement\>                       | 'bottomRight' |
| as?                 | string \| Component                                   | 'div'         |
| offset?             | { left: Nullable\<number\>, top: Nullable\<number\> } | {}            |

## Usage

```vue
<script setup>
import { Located } from 'cesium-use'
import MyButton from './MyButton.vue'

const state = ref(true)
const coordinate = ref([-100, 10])
</script>

<template>
  <Located
    v-model="state"
    :as="MyButton"
    placement="top"
    :coordinate
  >
    <div>
      Hello world!
    </div>
  </Located>
</template>
```
