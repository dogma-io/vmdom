jest.mock('../Document')

import Document from '../Document'
import Window from '../Window'

describe('Window', () => {
  let instance

  beforeEach(() => {
    instance = new Window()
  })

  it('should implement expected interfaces and has correct enumerables', () => {
    expect(instance).toImplementEventTarget()
    expect(instance).toImplementWindowOrWorkerGlobalScope()
    expect(instance).toHaveEnumerables([])
  })

  it('should not instantiate classes for lazily load properties', () => {
    expect(Document).not.toHaveBeenCalled()
  })

  describe('when document property accessed', () => {
    let doc

    beforeEach(() => {
      doc = instance.document
    })

    it('should instantiate document property', () => {
      expect(Document).toHaveBeenCalledTimes(1)
      expect(doc).toBeInstanceOf(Document)
    })
  })
})
