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

// It can be null or undefined because it may be garbage collected.
type StoredViewerInst = Viewer | null | undefined

const INJECT_KEY_VIEWER: InjectionKey<ShallowRef<Viewer>> = Symbol('viewer')

const viewer = shallowRef<StoredViewerInst>()

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

export function setViewer(v: StoredViewerInst) {
  viewer.value = v
}

export function useViewerProvider(v: ShallowRef<Viewer>) {
  provide(INJECT_KEY_VIEWER, v)
}
