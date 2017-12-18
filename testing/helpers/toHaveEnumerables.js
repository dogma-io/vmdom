/**
 * @format
 */

module.exports = function toHaveEnumerables(received, expected) {
  const actual = Object.keys(received)

  actual.sort()
  expected.sort()

  const pass = expected.every((key, index) => key === actual[index])

  return {
    message: () => {
      const expectedString = expected.join(', ')

      return pass
        ? `expected not to have enumerables: ${expectedString}`
        : `expected to have enumerables: ${expectedString}`
    },
    pass,
  }
}
