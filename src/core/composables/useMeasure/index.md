# useMeasure

A collection of measure tools, for various measurements in GIS.

## Usage

### area

```js
const { state, clearAll } = useMeasure('area', {
  format: area => `Area: ${area.toFixed(2)} m²`
})
```

Start measuring when `state` is `true` , `Left_CLICK` to create new point, `LEFT_DOUBLE_CLICK` to end the measure. It use `editEntity` to merge constructor options of all entities.

Change label from `format` option.

### distance

```js
const { state, clearAll } = useMeasure('distance', {
  lineEntityProps: {
    polyline: {
      width: 2,
      material: Cesium.Color.ORANGE,
    },
  },
})
```

Start measuring when `state` is `true` , `Left_CLICK` to create new point, `LEFT_DOUBLE_CLICK` to end the measure. It use `editEntity` to merge constructor options of all entities.

The measured distance is the straight-line distance between two points.

### height

```js
const { state, clearAll } = useMeasure('height')
```

Start measuring when `state` is `true`. Left click to pick the start point, double left click to pick the end point. It use `editEntity` to merge constructor options of all entities.

Obtain the height by calculating the projected coordinates.
