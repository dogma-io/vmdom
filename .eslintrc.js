const WARN = 'warn'

module.exports = {
  extends: ['lintly'],
  overrides: [
    {
      excludedFiles: ['**/__mocks__/**/*.js', '**/__tests__/**/*.js'],
      files: ['**/*.js'],
      rules: {
        'flowtype/no-flow-fix-me-comments': [WARN],
      },
    },
  ],
  rules: {
    'flowtype/no-flow-fix-me-comments': [WARN]
  },
}
