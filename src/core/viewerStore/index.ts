import {
  type InjectionKey,
  type ShallowRef,
  getCurrentInstance,
  inject,
  provide,
  shallowRef,
  toValue,
} from 'vue'
import type { Viewer } from 'cesium'

const INJECT_KEY_VIEWER: InjectionKey<ShallowRef<Viewer>> = Symbol('viewer')

const viewer = shallowRef<Viewer>()

export function getViewer(): Viewer {
  if (getCurrentInstance()) {
    const viewerInject = toValue(inject(INJECT_KEY_VIEWER, undefined))
    if (viewerInject)
      return viewerInject
  }

  const v = toValue(viewer)
  if (!v)
    throw new Error('cannot get viewer.')
  return v
}

export function setViewer(v: Viewer) {
  viewer.value = v
}

export function useViewerProvider(v: ShallowRef<Viewer>) {
  provide(INJECT_KEY_VIEWER, v)
}
