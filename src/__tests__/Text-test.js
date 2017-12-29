/**
 * @format
 */

import Text from '../Text'
import {toBeCharacterData} from './CharacterData.utils'

const TESTS = [
  [true, 'true'],
  [null, 'null'],
  [1, '1'],
  ['foo', 'foo'],
  [undefined, 'undefined'],
]

describe('Text', () => {
  TESTS.forEach(([input, output]) => {
    describe(`when input is ${input === null ? 'null' : typeof input}`, () => {
      let instance

      beforeEach(() => {
        instance = new Text(input)
      })

      toBeCharacterData(() => instance, output)

      it('should have expected enumerables', () => {
        expect(instance).toHaveEnumerables([])
      })
    })
  })

  it('should throw when data is a symbol', () => {
    expect(() => {
      new Text(Symbol('foo')) // eslint-disable-line
    }).toThrow(TypeError)
  })
})
