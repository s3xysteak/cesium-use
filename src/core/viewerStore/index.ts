import {
  shallowRef,
  getCurrentInstance,
  toValue,
  inject,
  provide,
  type InjectionKey
} from 'vue'
import type { Viewer } from 'cesium'

const INJECT_KEY_VIEWER: InjectionKey<Viewer> = Symbol('viewer')

const viewer = shallowRef<Viewer>()

export const getViewer = (): Viewer => {
  if (getCurrentInstance()) {
    const viewerInject = toValue(inject(INJECT_KEY_VIEWER, undefined))
    if (viewerInject) return viewerInject
  }

  const v = toValue(viewer)
  if (!v) throw new Error('cannot get viewer.')
  return v
}

export const setViewer = (v: Viewer) => {
  viewer.value = v
}

export const useViewerProvider = (v: Viewer) => {
  provide(INJECT_KEY_VIEWER, v)
}
