# 简介

Cesium Use 是一个基于 Vue 的 CesiumJS 工具库，提供了一系列的函数与组件以供使用，旨在简化基于 CesiumJS 的开发流程，提供更好的开发体验和更高的开发效率。

::: tip 前置知识

- `JavaScript`
- `Vue`
- `CesiumJS`

在开始使用 Cesium Use 之前，假定你已经对他们有基本的了解。
:::

## 示例

```vue {5,7,12,18-20}
<script setup>
import * as Cesium from 'cesium'
import { Located } from 'cesium-use'

// 自动引入 import { useViewer, useEventHandler } from 'cesium-use'

const viewer = useViewer()

const show = ref(true)
const pos = shallowRef()

const eventHandler = useEventHandler()
eventHandler((e) => {
  pos.value = viewer.scene.pickPosition(e.position)
}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
</script>

<template>
  <Located v-model="show" :coordinate="pos">
    <div>I am Cesium Use!</div>
  </Located>
</template>
```

::: details 代码解释
在点击 cesium 的地球时，一个写着"I am Cesium Use!"的窗口会被固定在所点击的坐标上。
:::

上面的示例展示了 Cesium Use 最基本的几个功能：

- **原生开发体验:** 尽可能提供与原生 CesiumJS 相近的开发体验。
- **函数与组件:** 提供了一系列函数与组件，以覆盖多种使用情况。
- **自动引入:** 自带对 `unplugin-auto-import` 的支持，这使得你无需手动引入其提供的方法。
- **Viewer 管理:** 提供了一些函数以对 Viewer 进行管理，这能方便的获取 Viewer 实例。
- **类型支持:** Cesium Use 是使用`typescript`进行开发的，但致力于为 ts 与 js 用户带来同样舒适的开发体验。

## 响应式支持

Cesium Use 生来就完全支持 Getter 风格的响应式传参，所有期望响应式变量的参数都可以使用以下规范的变量：

- 原始值。
- 基础的响应式变量，如被`ref`包装的值。
- Getter 风格，如`() => val`

示例：

```js
import { func } from 'cesium-use' // 事实上并没有这个函数，这里只是举例。

const valRaw = 1 // 原始值
func(valRaw)

const valRef = ref(1) // 响应式
func(valRef)

const valGetter = 1
func(() => valGetter) // Getter
```

## 命名规范

`cesium-use` 遵循 `composable` 组合式函数命名规范。

1. 所有以 `use` 开头的函数一定**是**组合式函数，这意味着你应当在 `setup` 调用栈内调用它们。
2. 所有非 `use` 开头的函数一定**非**组合式函数。

## Viewer 管理

为了方便管理 Viewer 实例，Cesium Use 提供了两个方法以供使用。

- `useViewer` 通过 `依赖注入` 获取 viewer 实例。
- `useViewerProvider` 通过 `依赖注入` 注入 viewer 实例。

更多相关内容见 [useViewer](composables/useViewer.md)。
