import type {
  Entity,
  PolylineGraphics,
  PolygonGraphics,
  PointGraphics
} from 'cesium'

interface EditEntityMap {
  point: PointGraphics.ConstructorOptions
  polyline: PolylineGraphics.ConstructorOptions
  polygon: PolygonGraphics.ConstructorOptions
}

const list = ['point', 'polyline', 'polygon'] as const

export const editEntity = list.reduce((acc, attr) => {
  acc[attr] = createEditEntity(attr)
  return acc
}, {} as { [K in (typeof list)[number]]: ReturnType<typeof createEditEntity<K>> })

function createEditEntity<T extends keyof EditEntityMap>(attr: T) {
  return (entity: Entity, ...args: EditEntityMap[T][]) => {
    entity[attr] = Object.assign(entity[attr] ?? {}, ...args)
  }
}
