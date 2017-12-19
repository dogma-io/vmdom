jest.mock('../Document')

import Document from '../Document'
import Window from '../Window'

describe('Window', () => {
  let instance

  beforeEach(() => {
    Document.mockReset()
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

  describe('destroy()', () => {
    beforeEach(() => {
      Document.destroy = jest.fn()
    })

    it('should destroy document when document has been accessed', () => {
      let tmp = instance.document // eslint-disable-line
      Window.destroy(instance)
      expect(Document.destroy).toHaveBeenCalledTimes(1)
      expect(Document.destroy).toHaveBeenCalledWith(instance.document)
    })

    it('should not destroy document when document has not been accessed', () => {
      Window.destroy(instance)
      expect(Document.destroy).not.toHaveBeenCalled()
    })
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
