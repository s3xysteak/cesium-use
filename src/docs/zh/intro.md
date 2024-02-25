# 简介

Cesium Use 是一个基于 Vue 的 CesiumJS 工具库，提供了一系列的函数与组件以供使用，旨在简化基于 CesiumJS 的开发流程，提供更好的开发体验和更强大的功能。

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

// 自动引入 import { getViewer, useEvent } from 'cesium-use'

const viewer = getViewer()

const show = ref(true)
const pos = shallowRef()

useEvent(e => {
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
- **类型支持:** Cesium Use 是使用`typescript`进行开发的，但致力于为 ts 与 js 用户带来同样舒适的开发体验！

## 响应式支持

Cesium Use 生来就完全支持 Getter 风格的响应式传参，所有期望响应式变量的参数都可以使用以下规范的变量：

- 原始值。
- 基础的响应式变量，如被`ref`包装的值。
- Getter 风格，如`() => val`

示例：

```js
import { func } from 'cesium-use' // 事实上并没有这个函数，这里只是举例。

let valRaw = 1 // 原始值
func(valRaw)

const valRef = ref(1) // 响应式
func(valRef)

let valGetter = 1
func(() => valGetter) // Getter
```

## Viewer 管理

### viewerStore 函数

为了方便管理 Viewer 实例，Cesium Use 提供了三个方法以供使用。

- `getViewer` 获取 viewer 实例。
- `setViewer` 通过一个模块级顶级变量保存 viewer。
- `useViewerProvider` 利用 vue 的依赖注入实现 viewer 在组件间的传递。

和许多 Vue 库的实践不同，Cesium Use **推荐**使用`setViewer`而不是基于依赖注入的`useViewerProvider`。因为依赖注入只能在 setup 调用栈中使用，而在 CesiumJS 中很难保证在同一个调用栈中完成所有实现。

更多相关内容见 [viewerStore](/core/viewerStore/index-zh.md)。

### 组件结构的最佳实践

建议以一个承载 viewer 的组件作为祖先组件，在 viewer 被挂在后在保证子组件渲染。  
例如这样的结构：

```md
- earth-container.vue
- Earth.vue
```

在`earth-container.vue`中:

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

在 `Earth.vue` 中:

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

也就是说，强烈建议在一个单独的组件中完成 viewer 的初始化。  
以上述的`earth-container.vue`为例，他仅仅完成实例化 viewer 这一步操作，并且在实例化 viewer 后再渲染后代组件。其他后续操作都在`Earth.vue`以及其他子组件中进行。这样能保证在后续代码中顺利获取已经在容器组件中实例化的 viewer 实例。
