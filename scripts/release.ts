import { execSync } from 'node:child_process'
import process from 'node:process'
import { consola } from 'consola'

const versionList = ['major', 'minor', 'patch'] as const
type Version = (typeof versionList)[number]

const version = process.argv[2] as Version

if (!versionList.includes(version)) {
  consola.error(new Error('Invalid version'))
  process.exit(1)
}

execSync(`npm version ${version} -m "release: v%s"`, { stdio: 'inherit' })
execSync('git push --tags', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
