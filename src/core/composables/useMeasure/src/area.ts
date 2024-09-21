import { at } from '@s3xysteak/utils'
import { useViewer } from '~composables/useViewer'
import * as Cesium from 'cesium'
import { type Ref, ref, type ShallowRef, shallowRef, watch } from 'vue'
import { defineColor, editEntity, syncEntityCollection, useEventHandler } from '~/index'
import { pickPosition as _pickPosition } from '../utils'

export interface AreaOptions {
  format?: (area: number) => string
  areaEntityProps?: Cesium.Entity.ConstructorOptions
  startEntityProps?: Cesium.Entity.ConstructorOptions
  turnEntityProps?: Cesium.Entity.ConstructorOptions
  endEntityProps?: Cesium.Entity.ConstructorOptions
  closeEntityProps?: Cesium.Entity.ConstructorOptions
  centerEntityProps?: Cesium.Entity.ConstructorOptions
}

interface AreaEntityData {
  /**
   * All entities in made by `AreaOptions`.
   */
  entities: Cesium.EntityCollection

  /**
   * Polygon positions.
   */
  positions: Cesium.Cartesian3[]
}

export interface AreaReturn {
  /**
   * Whether the area measurement is in progress
   */
  state: Ref<boolean>

  /**
   * Current area measurement entity
   */
  current: ShallowRef<AreaEntityData | undefined>

  /**
   * All area measurement entities
   */
  set: Set<AreaEntityData>

  /**
   * Clear all area measurement entities
   */
  clearAll: () => void
}

const initialEntityProps: Cesium.Entity.ConstructorOptions = {
  point: {
    color: Cesium.Color.WHITE,
    outlineColor: Cesium.Color.RED,
    outlineWidth: 2,
    pixelSize: 6,
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
  },
}

export function area(options: AreaOptions = {}): AreaReturn {
  const {
    areaEntityProps = {},
    startEntityProps = {},
    turnEntityProps = {},
    endEntityProps = {},
    closeEntityProps = {},
    centerEntityProps = {},
    format = area => area ? `Area: ${(area / 1000_000).toFixed(2)} km²` : '',
  } = options

  const state = ref(false)
  const current = shallowRef<AreaEntityData>()
  const dateSet = new Set<AreaEntityData>()

  let __pointer: number
  const __currentTurnList = shallowRef<Cesium.Entity[]>([])

  const viewer = useViewer()

  const entitiesCreator = () => syncEntityCollection(viewer.entities)
  const eventHandler = useEventHandler()

  const createEntity = (): AreaEntityData => {
    const positions: Cesium.Cartesian3[] = []
    const entities = entitiesCreator()
    const val = {
      entities,
      positions,
    }

    entities.add(editEntity({
      position: new Cesium.CallbackProperty(() => getCenter(positions), false) as any,
      label: {
        text: new Cesium.CallbackProperty(() => format(getArea(positions)), false),
        showBackground: true,
        fillColor: Cesium.Color.BLACK,
        style: Cesium.LabelStyle.FILL,
        backgroundColor: defineColor('#ffffff/80'),
        font: '14px sans-serif',
        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
      },
    }, centerEntityProps))

    entities.add(editEntity({
      polyline: {
        positions: new Cesium.CallbackProperty(() => {
          if (current.value !== val)
            return [...positions, positions[0]]
          return positions
        }, false),
        material: defineColor('#ff0000/80'),
        width: 2,
      },
      polygon: {
        hierarchy: new Cesium.CallbackProperty(() => new Cesium.PolygonHierarchy(positions), false),
        material: defineColor('#ff0000/20'),
        perPositionHeight: true,
      },
    }, areaEntityProps))

    dateSet.add(val)

    return val
  }

  watch(state, (val) => {
    if (val) {
      current.value = createEntity()
      __pointer = -1
      __currentTurnList.value = []
    }
  }, {
    immediate: true,
  })

  const pickPosition = (pos: Cesium.Cartesian2) => _pickPosition(pos, viewer)
  eventHandler(({ position }) => {
    const pos = pickPosition(position)
    if (!pos)
      return

    const picked = viewer.scene.pick(position)
    if (picked && picked?.id && picked?.id?.name === '__cesium-use_measure_area_close') {
      const entity = picked.id
      dateSet.forEach((data) => {
        const { entities } = data
        if (!entities.contains(entity))
          return

        entities.removeAll()
        dateSet.delete(data)
      })
    }

    if (!state.value || !current.value)
      return

    const { entities, positions } = current.value

    const onFirst = () => {
      entities.add(editEntity({
        position: pos,
      }, initialEntityProps, startEntityProps))
    }
    const onNormal = () => {
      const turnEntity = entities.add(editEntity({
        position: pos,
      }, initialEntityProps, turnEntityProps))
      __currentTurnList.value.push(turnEntity)
    }

    __pointer === -1 ? onFirst() : onNormal()

    __pointer++
    positions[__pointer] = pos
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

  eventHandler(({ position }) => {
    if (!state.value || !current.value)
      return

    const pos = pickPosition(position)
    if (!pos)
      return

    state.value = false

    const { entities } = current.value!

    const shouldBeRemoved = [at(__currentTurnList.value, -1), at(__currentTurnList.value, -2)]

    shouldBeRemoved.forEach((last) => {
      entities.removeById(last.id)
      __currentTurnList.value.pop()
    })

    entities.add(editEntity({
      position: pos,
    }, initialEntityProps, endEntityProps))
    entities.add(editEntity({
      position: pos,
      name: '__cesium-use_measure_area_close',
      label: {
        text: '×',
        font: '16px Helvetica',
        fillColor: Cesium.Color.RED,
        showBackground: true,
        backgroundColor: Cesium.Color.WHITE,
        backgroundPadding: new Cesium.Cartesian2(2, 2.5),
        pixelOffset: new Cesium.Cartesian2(20, 0),
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
      },
    }, closeEntityProps))

    current.value = undefined
  }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)

  eventHandler(({ endPosition }) => {
    if (!state.value || !current.value)
      return

    const pos = pickPosition(endPosition)
    if (!pos)
      return

    current.value.positions[__pointer + 1] = pos
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

  function clearAll() {
    state.value = false
    current.value = undefined

    dateSet.forEach(({ entities }) => {
      entities.removeAll()
    })
    dateSet.clear()
  }

  return {
    state,
    current,
    set: dateSet,
    clearAll,
  }
}

function getCenter(list: Cesium.Cartesian3[]): Cesium.Cartesian3 {
  if (list.length === 0)
    return Cesium.Cartesian3.ZERO

  let sumX = 0
  let sumY = 0
  let sumZ = 0

  for (let i = 0; i < list.length; i++) {
    sumX += list[i].x
    sumY += list[i].y
    sumZ += list[i].z
  }

  const centerX = sumX / list.length
  const centerY = sumY / list.length
  const centerZ = sumZ / list.length

  return new Cesium.Cartesian3(centerX, centerY, centerZ)
}

function getArea(positions: Cesium.Cartesian3[]): number {
  const hierarchy = new Cesium.PolygonHierarchy(positions)

  // @ts-expect-error - Private class
  const indices = Cesium.PolygonPipeline.triangulate(hierarchy.positions, hierarchy.holes)
  let area = 0
  for (let i = 0; i < indices.length; i += 3) {
    const vector1 = hierarchy.positions[indices[i]]
    const vector2 = hierarchy.positions[indices[i + 1]]
    const vector3 = hierarchy.positions[indices[i + 2]]
    const vectorC = Cesium.Cartesian3.subtract(vector2, vector1, new Cesium.Cartesian3())
    const vectorD = Cesium.Cartesian3.subtract(vector3, vector1, new Cesium.Cartesian3())
    const areaVector = Cesium.Cartesian3.cross(vectorC, vectorD, new Cesium.Cartesian3())
    area += Cesium.Cartesian3.magnitude(areaVector) / 2.0
  }

  return area
}
