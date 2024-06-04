# editEntity

`editEntity` simplifies the merging of entity properties and provides complete type hints. It is implemented based on `Object.assign`, where options specified later will override options specified earlier. It offers comprehensive type hints and a much better development experience compared to manual operations without intelligent prompts.

## Usage

This will change the material of the entity to red, and the height of the entity to 1:

```js
const entity = viewer.entities.add({
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArray([-100, 30, -80, 70, -10, 40])
  }
})

editEntity(
  entity,
  {
    polygon: {
      height: 1,
      material: Cesium.Color.AQUA,
    },
  },
  {
    polygon: {
      material: Cesium.Color.RED,
    },
  },
)
```
