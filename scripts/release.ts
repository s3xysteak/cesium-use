import { consola } from 'consola'
import { execSync } from 'node:child_process'

type Version = 'major' | 'minor' | 'patch'
const isValidVersion = (version: string) => {
  return ['major', 'minor', 'patch'].includes(version)
}

const version = process.argv[2] as Version
if (!isValidVersion(version)) {
  consola.error(new Error('Invalid version'))
  process.exit(1)
}

execSync(`npm version ${version} -m "release: v%s"`, { stdio: 'inherit' })
execSync('git push --tags', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
