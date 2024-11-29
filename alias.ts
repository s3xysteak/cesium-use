import { fileURLToPath } from 'node:url'

export default r({
  '~': './packages',
  '~components': './packages/components',
  '~composables': './packages/composables',
  '~utils': './packages/utils',
  '~shared': './packages/shared',
})

function r(aliasMap: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(aliasMap).map(([key, value]) => [
      key,
      fileURLToPath(new URL(value, import.meta.url)),
    ]),
  )
}
