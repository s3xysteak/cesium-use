# Located

将 DOM 固定在指定坐标上。

## 使用

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

其中:

- `v-model` 绑定一个布尔值，控制了`Located`的显示与隐藏。
- `as` 可以将`Located`改变为想要的 DOM，默认为`'div'`，也可以像示例代码一样传递组件。
- `placement`提供了一系列预设方位，默认为`bottomRight`表示 DOM 在坐标的右下方(即 DOM 的左上角固定在坐标上。)
- `coordinate` 用于控制`Located`固定的坐标。
- `offset` 用于调整 DOM 定位的偏移。`top` 和 `left` 为 css 单位。

## 类型声明

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
   * 元素方位
   * @default 'bottomRight'
   */
  placement?: Placement

  /**
   * DOM的css偏差
   */
  offset?: Partial<{
    left: number
    top: number
  }>

  as?: string | Component
}
```

:::
