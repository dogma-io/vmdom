/**
 * @format
 */

module.exports = function toHaveEnumerables(received, expected) {
  const actual = Object.keys(received)

  actual.sort()
  expected.sort()

  const pass = actual.length === expected.length &&
    expected.every((key, index) => key === actual[index])

  return {
    message: () => {
      const actualString = actual.join(', ')
      const expectedString = expected.join(', ')

      return pass
        ? `expected not to have enumerables:\n\n\t${expectedString}`
        : `expected to have enumerables:\n\n\t${expectedString}\n\nbut instead received:\n\n\t${actualString}`
    },
    pass,
  }
}
