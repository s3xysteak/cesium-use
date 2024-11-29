import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'off',
  },
}, {
  ignores: [
    '.vscode/settings.json',
    'packages/imports.ts',
  ],
})
