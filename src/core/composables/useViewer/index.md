# useViewer

Managing the `viewer` based on `provide / inject`.

- `useViewer` Get viewer instance.
- `useViewerProvider` Provide viewer instance.

:::tip
For more details about `provide / inject`, please refer to [vue document](https://vuejs.org/guide/components/provide-inject.html) 。
:::

## Usage

### useViewerProvider

For parent component, use `useViewerProvider` to inject `Viewer`. `useViewerProvider` receives a callback returned a viewer instance, which can also be async function:

`useViewerProvider(() => new Cesium.Viewer(container.value))`

The callback function will be called in `onMounted` hook, therefore, you can safely use DOM references in callback functions.

- `isMounted` is one of its return values. Its initial value is always `ref(false)`, and it changes to `ref(true)` after the `Viewer` is mounted.
- `viewer` is one of its return values. Its initial value is `shallowRef(undefined)`, and it changes to `shallowRef(viewer)` after the `Viewer` is mounted. This is an alternative option, and in most cases, you don't need to use it. It's recommended to isolate the business components from the component initializing the `Viewer` to avoid the complexity of handling whether the `Viewer` is mounted.

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
  <!-- Confirm when the child component is created, viewer has been initialized -->
  <slot v-if="isMounted" />
</template>
```

### useViewer

For child component, use `useViewer` to get the `viewer` instance provided by parent component.

```vue
<script setup>
const viewer = useViewer()
console.log(viewer instanceof Cesium.Viewer) // true
</script>

<template>
  <div />
</template>
```

## Error Checking Guide

Errors are typically caused by `useViewer`, and an error is thrown when `useViewer` fails to retrieve the viewer instance. Here are some common ways to check the error reasons.

### Unable to Retrieve Context

::: danger Error Message
[cesium-use] Failed to get viewer because cannot get setup context.
:::

This error message indicates that the setup context was not captured. For composition functions, you should call them within the setup context as outlined in the Vue official documentation.

Here are some common errors:

- Calling in other lifecycle hooks: Since setup is an independent lifecycle, calling composition functions in other lifecycles will result in errors.
- Calling within asynchronous tasks: Even if asynchronous tasks are executed within the setup period, since asynchronous tasks are not in the setup's synchronous call stack, calling composition functions within asynchronous tasks will obviously result in errors.

### Viewer Not Yet Defined

::: danger Error Message
[cesium-use] Failed to get viewer because viewer is undefined now.
:::

This error message indicates that the context has been captured, but the retrieved viewer is empty, indicating that the viewer has not been initialized at this point.

As shown in the example, you can control the generation of components by returning the value `isMounted` to ensure that child components are rendered after the viewer is initialized.

## Handling Errors Manually

`useViewer` provides several optional parameters for handling unexpected behavior. By default, it throws an error when an error occurs (as explained above), but you can also choose to output error messages to the console or take no action. Refer to the type declarations for more details.
