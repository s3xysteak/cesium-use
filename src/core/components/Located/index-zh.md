# Located

将 DOM 固定在指定坐标上。

更详细的类型声明与源码参见 [useLocated](/zh/composables/useLocated.md) 。

| 名称                 | 类型                                                | 默认值             |
| ------------------- | -------------------------------------------------- | ----------------- |
| (v-model)modelValue | boolean                                            | true              |
| coordinate          | Nullable<Cartesian3 \| MaybeCoordinates>           | **required**      |
| placement?           | Nullable<UseLocatedPlacement>                     | 'bottomRight'     |
| as?                  | string \| Component                               | 'div'             |
| offset?              | { left: Nullable<number>, top: Nullable<number> } | {}                |

## 使用

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
