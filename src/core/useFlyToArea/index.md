# useFlyToArea

Move the viewpoint to a position where all input coordinates are visible using `flyToBoundingSphere`.

## Usage

```js
useFlyToArea([[100, 20], ['120', 40], Cesium.Cartesian3.fromDegrees(110, 30)], {
  onSingle: () => flyTo(id),
  onEmpty: () => initCamera()
})
```

By default:

- When there is nothing in the array, no action will be taken.
- When there is only 1 element in the array, the viewpoint will fly to an overhead position on the coordinate.

## Type Declarations

::: details

```ts
export interface UseFlyToAreaOptions {
  onSingle: () => void
  onEmpty: () => void
}

function useFlyToArea(
  posList: MaybeCartesian3OrLonLat[],
  options?: Partial<UseFlyToAreaOptions>
): void
```

:::
