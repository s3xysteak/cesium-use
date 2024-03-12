import { URL, fileURLToPath } from 'node:url'
import { readdirSync, writeFileSync } from 'node:fs'
import type { Plugin } from 'vite'
import type { PluginOptions } from 'vite-plugin-dts'

const concatList = ['useViewerProvider', 'getViewer', 'setViewer']
const ignoreList = ['viewerStore']

export function supportAutoImportPlugin(): Plugin {
  return {
    name: 'support-auto-import-plugin',
    apply: 'build',
    transform(code, id) {
      if (id.endsWith('src/core/viewerStore/index.ts')) {
        const dirNameList = readdirSync(
          fileURLToPath(new URL('../core', import.meta.url)),
        ).filter(file => ignoreList.every(i => i !== file))

        const resultArrString = JSON.stringify([...concatList, ...dirNameList])
        const result = `
          map => {
            const arr = ${resultArrString}
      
            return {
              'cesium-use': arr.map(v => map && map[v] ? [v, map[v]] : v),
            }
          }
        `

        return `\r\n` + `export const autoImport = ${result};` + `\r\n${code}`
      }
    },
  }
}

export const supportAutoImportDts: PluginOptions['afterBuild'] = (dtsMap) => {
  const dirNameList = readdirSync(
    fileURLToPath(new URL('../core', import.meta.url)),
  ).filter(file => ignoreList.every(i => i !== file))
  const resultArr = [...concatList, ...dirNameList]
  const mapType = `Partial<Record<'${resultArr.join('\'|\'')}', string>>`
  const result = `export declare const autoImport: (map?: ${mapType}) => { 'cesium-use': (string | [string, string])[] };`

  const path = fileURLToPath(
    new URL('../../dist/index.d.ts', import.meta.url),
  ).replace(/\\/g, '/')

  writeFileSync(path, `${dtsMap.get(path)}\r\n${result}\r\n`)
}
