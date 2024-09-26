# 简介

Cesium Use 是一个基于 Vue 的 CesiumJS 工具库，提供了一系列的函数与组件以供使用，旨在简化基于 CesiumJS 的开发流程。

::: tip 前置知识

- `JavaScript`
- `Vue`
- `CesiumJS`

在开始使用 Cesium Use 之前，假定你已经对他们有基本的了解。
:::

## 示例

在地球上点击以查看结果！

<script setup>
import { defineAsyncComponent } from 'vue'
const Viewer = defineAsyncComponent(() => import('../../.vitepress/components/Viewer.vue'))
const Demo = defineAsyncComponent(() => import('../../.vitepress/components/IntroDemo.vue'))
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

::: details 代码

其结构如下：

```vue
<template>
  <Viewer>
    <Demo />
  </Viewer>
</template>
```

其中 `Viewer.vue` 的代码:

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

其中 `Demo.vue` 的代码:

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

上面的示例展示了 Cesium Use 最基本的几个功能：

- **原生开发体验:** 尽可能提供与原生 CesiumJS 相近的开发体验。
- **函数与组件:** 提供了一系列函数与组件，以覆盖多种使用情况。
- **自动引入:** 自带对 `unplugin-auto-import` 的支持，这使得你无需手动引入其提供的方法。
- **Viewer 管理:** 提供了一些函数以对 Viewer 进行管理，这能方便的获取 Viewer 实例。

::: tip
在 [stackblitz](https://stackblitz.com/edit/vitejs-vite-t6qklc?file=src%2FDemo.vue) 上在线运行前面的示例！
:::

## 命名规范

`cesium-use` 遵循 `composable` 组合式函数命名规范。

1. 所有以 `use` 开头的函数一定**是**组合式函数，这意味着你应当在 `setup` 调用栈内调用它们。
2. 所有非 `use` 开头的函数一定**非**组合式函数。

## Viewer 管理

为了方便管理 Viewer 实例，Cesium Use 提供了两个方法以供使用。

- `useViewer` 通过 `依赖注入` 获取 viewer 实例。
- `useViewerProvider` 通过 `依赖注入` 注入 viewer 实例。

更多相关内容见 [useViewer](composables/useViewer.md)。
