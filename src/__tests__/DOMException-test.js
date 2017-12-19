import DOMException from '../DOMException'

const ERROR_CODES_TO_NAMES = [
  [1, 'IndexSizeError'],
  [2, 'DOMStringSizeError'],
  [3, 'HierarchyRequestError'],
  [4, 'WrongDocumentError'],
  [5, 'InvalidCharacterError'],
  [6, 'NoDataAllowedError'],
  [7, 'NoModificationAllowedError'],
  [8, 'NotFoundError'],
  [9, 'NotSupportedError'],
  [10, 'InUseAttributeError'],
  [11, 'InvalidStateError'],
  [12, 'SyntaxError'],
  [13, 'InvalidModificationError'],
  [14, 'NamespaceError'],
  [15, 'InvalidAccessError'],
  [16, 'ValidationError'],
  [17, 'TypeMismatchError'],
  [18, 'SecurityError'],
  [19, 'NetworkError'],
  [20, 'AbortError'],
  [21, 'URLMismatchError'],
  [22, 'QuotaExceededError'],
  [23, 'TimeoutError'],
  [24, 'InvalidNodeTypeError'],
  [25, 'DataCloneError'],
]

describe('DOMException', () => {
  describe('when no arguments set', () => {
    let exception

    beforeEach(() => {
      exception = new DOMException()
    })

    it('returns expected code, message, and name for unknown error name', () => {
      expect(exception.code).toBe(0)
      expect(exception.message).toBe('DOMException: ')
      expect(exception.name).toBe('Error')
      expect(exception).toHaveEnumerables([])
    })

    it('should not allow code property to be overwritten', () => {
      expect((exception.code = 'foobar')).toBe('foobar')
      expect(exception.code).toBe(0)
    })

    it('should not allow message property to be overwritten', () => {
      expect((exception.message = 'foobar')).toBe('foobar')
      expect(exception.message).toBe('DOMException: ')
    })

    it('should not allow name property to be overwritten', () => {
      expect((exception.name = 'foobar')).toBe('foobar')
      expect(exception.name).toBe('Error')
    })
  })

  describe('when message argument set', () => {
    it('returns expected code, message, and name for unknown error name', () => {
      const message = 'foobar'
      const exception = new DOMException(message)

      expect(exception.code).toBe(0)
      expect(exception.message).toBe(`DOMException: ${message}`)
      expect(exception.name).toBe('Error')
      expect(exception).toHaveEnumerables([])
    })
  })

  describe('when message and name arguments set', () => {
    ERROR_CODES_TO_NAMES.forEach(([code, name]) => {
      it(`should return correct code, message, and name for ${name}`, () => {
        const message = 'foobar'
        const exception = new DOMException(message, name)

        expect(exception.code).toBe(code)
        expect(exception.message).toBe(`DOMException: ${message}`)
        expect(exception.name).toBe(name)
        expect(exception).toHaveEnumerables([])
      })
    })

    it('returns expected code, message, and name for unknown error type', () => {
      const message = 'foobar'
      const name = 'bar'
      const exception = new DOMException(message, name)

      expect(exception.code).toBe(0)
      expect(exception.message).toBe(`DOMException: ${message}`)
      expect(exception.name).toBe(name)
      expect(exception).toHaveEnumerables([])
    })
  })
})
