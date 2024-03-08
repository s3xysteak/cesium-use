import type { PolylineGraphics, PolygonGraphics, PointGraphics } from 'cesium'

export type EditEntityAttributes =
  | PolygonGraphics
  | PolylineGraphics
  | PointGraphics

export function editEntity(
  attr: PolygonGraphics,
  ...args: PolygonGraphics.ConstructorOptions[]
): PolygonGraphics

export function editEntity(
  attr: PolylineGraphics,
  ...args: PolylineGraphics.ConstructorOptions[]
): PolylineGraphics

export function editEntity(
  attr: PointGraphics,
  ...args: PointGraphics.ConstructorOptions[]
): PointGraphics

export function editEntity<T extends EditEntityAttributes>(
  attr: T,
  ...args: any[]
): T {
  return Object.assign(attr ?? {}, ...args)
}
