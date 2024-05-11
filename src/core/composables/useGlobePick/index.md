# useGlobePick

Get the coordinates on the ellipsoid as rays.

## Usage

```js{3}
// Usually you can use it with `useEvent`

const globePick = useGlobePick()

useEvent(({ position }) => {
  const pos = globePick(position)
}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
```

This method will only obtain the coordinates on the `ellipsoid + terrain`, and will ignore the tileset and model.
