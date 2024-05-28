# useEntityCollection

The EntityCollection that automatically synchronizes with the Viewer. Extends `Cesium.EntityCollection` .

## Usage

```js
const entityCollection = useEntityCollection()
const collection = entityCollection()
// This will synchronize with the context's viewer, eliminating the need for manually executing `viewer.entities.add()`.
collection.add({
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArray([-100, 30, -80, 70, -10, 40])
  }
})
```

The `useEntityCollection` will internally retrieve the viewer instance through `useViewer`.
