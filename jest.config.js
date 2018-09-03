/* eslint-disable comma-dangle, prettier/prettier */

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', '!src/**/__tests__/**/*.js'],
  coverageReporters: ['json-summary', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 95.31,
      functions: 98.29,
      lines: 97.15,
      statements: 97.15
    }
  },
  setupTestFrameworkScriptFile: '<rootDir>/jest-setup.js',
  testRegex: '/__tests__/.*-test\\.js$'
}
