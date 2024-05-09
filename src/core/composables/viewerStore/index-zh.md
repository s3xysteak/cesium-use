# viewerStore

viewerStore 是最特殊的一章节，因为并不存在 viewerStore 这个函数，这实际上是一系列函数的统称。

- get
  - `getViewer` 用于获取 viewer 实例。首先尝试通过依赖注入获取 viewer 实例，如果失败，则尝试通过模块级顶级变量获取 viewer 实例。如果再失败则抛出错误。
- set
  - `setViewer` 通过模块级顶级变量存储 viewer 实例。
  - `useViewerProvider` 通过依赖注入向子组件传递 viewer 实例。

## 使用

假设有这样的目录结构：

```md
- earth-container.vue
- Earth
  - Earth.vue
```

在`earth-container.vue`中:

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

onUnmounted(() => {
  setViewer(null) // 这有利于垃圾回收
})
</script>

<template>
  <div>
    <div ref="viewerContainer" />

    <Earth v-if="isViewerMounted" />
  </div>
</template>
```

在 `Earth.vue` 中:

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

你还可以在 js 中调用`getViewer`，只需要确保在**调用这个函数的上下文**能获取到 viewer 实例即可。这在编写函数或整理代码结构时是十分方便的。

```js
// utils/doSomething.js
export function doSomething() {
  const viewer = getViewer()
  // ...
}
```

```vue
<script setup>
import { doSomething } from '@/core/utils/doSomething.js'

// 如果这里的getViewer()可以正确执行。
getViewer()
// 那么函数内部的getViewer()也应当可以正确执行。
doSomething()
</script>

<template>
  <div />
</template>
```

事实上，绝大部分 CesiumUse 的函数都是这么做的。

## 查错指南

错误通常是由`getViewer`引起的，在`getViewer`尝试获取 viewer 实例失败后，会抛出错误。

::: danger 错误内容
[cesium-use] Failed to get viewer.
:::

这里提供了一些常见方式检查错误原因。

### viewer 尚未被实例化

在 Vue 中，setup 生命周期是最早的生命周期，而 DOM 在这之后才挂载。如果在 onMounted 中实例化 viewer，又尝试在同一个组件中获取实例，这显然会发生错误。

```vue {9-10,13-15}
<script setup>
import * as Cesium from 'cesium'

const container = ref()
onMounted(async () => {
  const viewer = new Cesium.Viewer(container.value)
})

// 此时容器尚未挂载！
const viewer = getViewer()

onMounted(() => {
  // 容器已经挂载。
  // 但实例化viewer的回调函数是一个异步函数，这里的同步任务会在其之前就会执行！
  const viewer = getViewer()
})
</script>

<template>
  <div ref="container" />
</template>
```

### 不在 setup 调用栈内

`useViewerProvider`是通过 Vue 的依赖注入特性实现的，因此必须符合依赖注入的条件，即必须在 setup 调用栈内执行`getViewer`才能正确获取到 viewer 实例。
假设父组件通过`useViewerProvider`正确提供了 viewer 实例：

```vue
<script setup>
// 正确
const viewer = getViewer()

async function getData() {
  // 错误，因为此时在异步任务中
  const viewer = getViewer()
  // ...
}
getData()

onMounted(() => {
  // 错误，因为此时在onMounted周期中
  const viewer = getViewer()
})
</script>
```

更多依赖注入内容请移步[ Vue 官方文档](https://cn.vuejs.org/guide/components/provide-inject.html)。
