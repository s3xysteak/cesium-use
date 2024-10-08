import type { Viewer } from 'cesium'
import { type Awaitable, isPromise, noop } from '@s3xysteak/utils'
import { error, throwError } from '~shared/errorHandler'
import {
  getCurrentInstance,
  inject,
  type InjectionKey,
  onMounted,
  provide,
  ref,
  type ShallowRef,
  shallowRef,
  toValue,
} from 'vue'

// Injection key
const INJECT_KEY_VIEWER: InjectionKey<ShallowRef<Viewer | undefined>> = Symbol('viewer')

// Error messages
const CANNOT_GET_SETUP_CONTEXT = 'Failed to get viewer because cannot get setup context.'
const UNDEFINED_VIEWER = 'Failed to get viewer because viewer is undefined now.'

export type UseViewerParam = 'throw-error' | 'no-throw-error' | 'silent'
export function useViewer(): Viewer
export function useViewer(isThrowError: UseViewerParam = 'throw-error'): Viewer | undefined {
  const errorMap = {
    'throw-error': (str: string) => throwError(str),
    'no-throw-error': (str: string) => error(str),
    'silent': noop,
  }
  if (!getCurrentInstance())
    errorMap[isThrowError](CANNOT_GET_SETUP_CONTEXT)

  const viewerInject = toValue(inject(INJECT_KEY_VIEWER, undefined))

  if (!viewerInject)
    errorMap[isThrowError](UNDEFINED_VIEWER)

  return viewerInject
}

/**
 * Accept a callback which will be called in `onMounted` hook and return a `Cesium.Viewer` instance. It can also be a async function.
 */
export function useViewerProvider(fn: () => Awaitable<Viewer>) {
  const viewer = shallowRef<Viewer>()

  /** `True` when viewer has been mounted */
  const isMounted = ref(false)

  const setViewer = (v: Viewer) => {
    viewer.value = v
    isMounted.value = true
  }
  onMounted(() => {
    const val = fn()

    isPromise(val)
      ? val.then(v => setViewer(v as Viewer))
      : setViewer(val as Viewer)
  })

  provide(INJECT_KEY_VIEWER, viewer)

  return {
    isMounted,
    viewer,
  }
}
