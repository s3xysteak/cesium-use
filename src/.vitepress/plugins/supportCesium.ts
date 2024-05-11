import type { Plugin } from 'vite'

function supportCesium(): Plugin {
  return {
    name: 'support-cesium',
    enforce: 'pre',
    transformIndexHtml: () => [
      {
        tag: 'script',
        children: `Object.defineProperties(window, { CESIUM_BASE_URL: { value: '/cesium-use/cesium-package/' } })`,
      },
    ],
  }
}

export default supportCesium
