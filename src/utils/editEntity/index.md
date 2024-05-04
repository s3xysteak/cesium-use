# editEntity

`editEntity` simplifies the merging of entity properties and provides complete type hints. It is implemented based on `Object.assign`, where options specified later will override options specified earlier.
`editEntity` primarily serves JavaScript users, offering comprehensive type hints and a much better development experience compared to manual operations without intelligent prompts.

## Usage

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
      material: Cesium.Color.AQUA,
    },
  },
  {
    polygon: {
      material: Cesium.Color.RED,
    },
  },
)
// This will change the material of the entity to red
```

## Type Declarations

::: details

```ts
function editEntity(entity: Entity, ...args: Entity.ConstructorOptions[]): Entity
```

:::
