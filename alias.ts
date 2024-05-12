import { fileURLToPath } from 'node:url'

export default r({
  '~': './src',
  '~components': './src/core/components',
  '~composables': './src/core/composables',
  '~utils': './src/core/utils',
  '~shared': './src/shared',
})

function r(aliasMap: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(aliasMap).map(([key, value]) => [
      key,
      fileURLToPath(new URL(value, import.meta.url)),
    ]),
  )
}
