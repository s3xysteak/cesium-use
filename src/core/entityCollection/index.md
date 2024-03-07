# entityCollection

The EntityCollection that automatically synchronizes with the Viewer.

## Usage

```js
const collection = entityCollection()
// This will synchronize with the context's viewer, eliminating the need for manually executing `viewer.entities.add()`.
collection.add({
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArray([-100, 30, -80, 70, -10, 40])
  }
})
```

The `entityCollection` will internally retrieve the viewer instance through `getViewer`.

## Usage Declaration

::: details

```ts
// It functions identically to Cesium's EntityCollection, with the exception of overridden methods for adding, removing, updating, and querying entities.

export const entityCollection = (
  ...args: ConstructorParameters<typeof Cesium.EntityCollection>
): new EntityCollection(...args)

class EntityCollection extends Cesium.EntityCollection {
  // ...
}
```

:::
