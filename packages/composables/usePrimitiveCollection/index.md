# usePrimitiveCollection

Similar to [useEntityCollection](/composables/useEntityCollection), but returns a `PrimitiveCollection`.

## Usage

In default, it synchronizes with `viewer.scene.primitives` in the context:

```js
const primitives = usePrimitiveCollection()
// Automatically clear `primitives` while the component unmounted
```

You can pass in a `PrimitiveCollection` manually as a target synchronized with:

```js
const collection = new Cesium.PrimitiveCollection()
usePrimitiveCollection(collection)
```
