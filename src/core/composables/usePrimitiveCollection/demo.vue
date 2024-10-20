<script setup lang="ts">
import * as Cesium from 'cesium'
import { effectScope } from 'vue'
import { usePrimitiveCollection } from '.'

const scope = effectScope()
scope.run(() => {
  const primitives = usePrimitiveCollection()
  primitives.add(
    new Cesium.GroundPrimitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry: new Cesium.RectangleGeometry({
          rectangle: Cesium.Rectangle.fromDegrees(-100.0, 20.0, -90.0, 30.0),
          vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
        }),
      }),
      appearance: new Cesium.EllipsoidSurfaceAppearance({
        material: Cesium.Material.fromType('Stripe'),
      }),
    }),
  )
})
</script>

<template>
  <button btn @click="scope.stop()">
    Dispose Scope
  </button>
</template>
