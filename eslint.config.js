import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'off',
  },
}, {
  ignores: [
    '.vscode/settings.json',
    'src/imports.ts',
    'src/resolvers.ts',
  ],
})
