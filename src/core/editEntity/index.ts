import type { Entity } from 'cesium'
import { mergeDeep } from '@/shared/general'

export function editEntity<T extends Entity | Entity.ConstructorOptions>(entity: T, ...args: Entity.ConstructorOptions[]): T {
  return mergeDeep(entity, ...args)
}
