import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'
import { join, resolve } from 'pathe'

const DIR_TYPES = resolve(fileURLToPath(import.meta.url), '../../../tsc-types/src/core')

export async function getTypeDeclaration(pkg: string, name: string): Promise<string | undefined> {
  const typingFilepath = join(DIR_TYPES, `${pkg}/${name}/index.d.ts`)

  if (!fs.existsSync(typingFilepath))
    return

  let types = await fs.readFile(typingFilepath, 'utf-8')

  if (!types)
    return

  // clean up types
  types = types
    .replace('/// <reference types="cesium/Source/Cesium.js" />', '')
    .replace(/import\(.*?\)\./g, '')
    .replace(/import[\s\S]+?from ?["'][\s\S]+?["']/g, '')
    .replace(/export \{\}/g, '')

  const prettier = await import('prettier')
  return (await prettier
    .format(
      types,
      {
        semi: false,
        parser: 'typescript',
      },
    ))
    .trim()
}
