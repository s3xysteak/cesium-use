# flyToArea

Move the viewpoint to a position where all input coordinates are visible using `flyToBoundingSphere`.

## Usage

```js
flyToArea([[100, 20], ['120', 40], Cesium.Cartesian3.fromDegrees(110, 30)], {
  onSingle: () => flyTo(id),
  onEmpty: () => initCamera()
})
```

By default, no action is taken when there is no data in the array, and the viewpoint flies to an overhead position only when there is a single piece of data.

## Type Declarations

::: details

```ts
export interface FlyToAreaOptions {
  onSingle: () => void
  onEmpty: () => void
}

function flyToArea(
  posList: maybeCartesian3OrLonLat[],
  options?: Partial<FlyToAreaOptions>
): void
```

:::
