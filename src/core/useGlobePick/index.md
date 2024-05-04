# useGlobePick

Get the coordinates on the ellipsoid as rays.

## Usage

```js{4}
// Usually you can use it with `useEvent`

useEvent(({ position }) => {
  const pos = useGlobePick(position)
}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
```

This method will only obtain the coordinates on the `ellipsoid+terrain`, and will ignore the tileset and model.

## Type Declaration

::: details

```ts
function useGlobePick(position: Cartesian2): Cartesian3 | undefined
```

:::
