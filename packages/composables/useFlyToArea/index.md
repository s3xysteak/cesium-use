# useFlyToArea

Move the viewpoint to a position where all input coordinates are visible using `flyToBoundingSphere`.

## Usage

```js
const flyToArea = useFlyToArea()
flyToArea([[100, 20], [120, 40], [110, 30]], {
  onSingle: () => flyTo(id),
  onEmpty: () => initCamera()
})
```

By default:

- When there is nothing in the array, no action will be taken.
- When there is only 1 element in the array, the viewpoint will fly to an overhead position on the coordinate.
