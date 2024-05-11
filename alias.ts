import { fileURLToPath } from 'node:url'

export default r({
  '@': './src',
  '~composables': './src/core/composables',
})

function r(aliasMap: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(aliasMap).map(([key, value]) => [
      key,
      fileURLToPath(new URL(value, import.meta.url)),
    ]),
  )
}
