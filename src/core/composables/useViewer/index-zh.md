# useViewer

基于依赖注入实现viewer的管理。

- `useViewer` 获取viewer实例。
- `useViewerProvider` 注入viewer实例。

:::tip
关于依赖注入的详细信息，请参考 [vue官方文档](https://cn.vuejs.org/guide/components/provide-inject.html) 。
:::

## 使用

### useViewerProvider

对于父组件，使用 `useViewerProvider` 注入viewer。useViewerProvider接受一个返回viewer实例的回调函数，这个函数可以是异步的:

`useViewerProvider(() => new Cesium.Viewer(container.value))`

该回调函数会在 `onMounted` 钩子中调用，因此可以放心的在回调函数中使用DOM引用。

- `isMounted` 是其返回值之一。其初始值总是`ref(false)`，并在 `Viewer` 完成挂载后变为 `ref(true)`。
- `viewer` 是其返回值之一。其初始值为 `shallowRef(undefined)`，在`Viewer`挂载后为 `shallowRef(viewer)`。这是一个备用选项，大多数情况下你都不需要使用它。建议隔离业务组件与初始化`Viewer`的组件，以避免处理`Viewer`是否挂载带来的复杂度。

```vue
<script setup>
const container = ref(null)

const { isMounted } = useViewerProvider(() => {
  const viewer = new Cesium.Viewer(container)
  // ...
  return viewer
})
</script>

<template>
  <div ref="container" />
  <!-- 确保子组件创建时，viewer已经完成初始化 -->
  <slot v-if="isMounted" />
</template>
```

### useViewer

对于子组件，使用 `useViewer` 获取父组件提供的viewer实例。

```vue
<script setup>
const viewer = useViewer()
console.log(viewer instanceof Cesium.Viewer) // true
</script>

<template>
  <div />
</template>
```

## 查错指南

错误通常是由`useViewer`引起的，在`useViewer`尝试获取 viewer 实例失败后，会抛出错误。这里提供了一些常见方式检查错误原因。

### 无法获取到上下文

::: danger 错误内容
[cesium-use] Failed to get viewer because cannot get setup context.
:::

此报错信息说明没有捕获到setup上下文。对于组合式函数，你应当在setup上下文中调用，详见 vue官方文档 。

有几种常见的错误：

- 在其他生命周期钩子中调用。由于setup是独立的生命周期，在其他生命周期中调用组合式函数显然会发生错误。
- 在异步任务中调用。即使在setup周期内执行异步任务，由于异步任务不在setup的同步调用栈中，在异步任务里调用组合式函数显然会发生错误。

### viewer 尚未被定义

::: danger 错误内容
[cesium-use] Failed to get viewer because viewer is undefined now.
:::

此报错信息说明已经捕获到上下文，但是获取到的viewer为空，这说明此时viewer尚未被初始化。

正如示例中所示，你可以通过返回值 `isMounted` 来控制组件的生成，以确保子组件在viewer被初始化后再渲染。

## 自行处理错误

`useViewer` 提供了几个可选的参数作为发生非预期行为时的处理方式。默认为在发生错误时抛出错误（见上方说明），也可以选择为控制台输出错误信息，或不作任何行为。详见类型声明。
