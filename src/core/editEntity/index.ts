import type {
  PolylineGraphics,
  PolygonGraphics,
  PointGraphics,
  BoxGraphics,
  CylinderGraphics
} from 'cesium'

export type EditEntityAttributes =
  | PolygonGraphics
  | PolylineGraphics
  | PointGraphics
  | BoxGraphics
  | CylinderGraphics

export function editEntity(
  attr: CylinderGraphics,
  ...args: CylinderGraphics.ConstructorOptions[]
): CylinderGraphics

export function editEntity(
  attr: BoxGraphics,
  ...args: BoxGraphics.ConstructorOptions[]
): BoxGraphics

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
