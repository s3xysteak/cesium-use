# pickGlobePosition

Get the coordinates on the ellipsoid as rays.

## Usage

```js{4}
// Usually you can use it with `useEvent`

useEvent(({ position }) => {
  const pos = pickGlobePosition(position)
}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
```

This method will only obtain the coordinates on the `ellipsoid+terrain`, and will ignore the tileset and model.

## Type Declaration

::: details

```ts
function pickGlobePosition(position: Cartesian2): Cartesian3 | undefined
```

:::
