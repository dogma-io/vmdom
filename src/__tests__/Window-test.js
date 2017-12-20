jest.mock('../Document')
jest.mock('../Navigator')

import Document from '../Document'
import Navigator from '../Navigator'
import Window from '../Window'

const UA =
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'

describe('Window', () => {
  let instance

  beforeEach(() => {
    Document.mockReset()
    instance = new Window({
      includeBody: true,
      includeHead: true,
      userAgent: UA,
    })
  })

  it('should implement expected interfaces and has correct enumerables', () => {
    expect(instance).toImplementEventTarget()
    expect(instance).toImplementWindowOrWorkerGlobalScope()
    expect(instance).toHaveEnumerables(['document', 'navigator'])
  })

  it('should not instantiate classes for lazily load properties', () => {
    expect(Document).not.toHaveBeenCalled()
    expect(Navigator).not.toHaveBeenCalled()
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
      expect(Document).toHaveBeenCalledWith({
        includeBody: true,
        includeHead: true,
      })
      expect(doc).toBeInstanceOf(Document)
    })
  })

  describe('when navigator property accessed', () => {
    let navigator

    beforeEach(() => {
      navigator = instance.navigator
    })

    it('should instantiate navigator property', () => {
      expect(Navigator).toHaveBeenCalledTimes(1)
      expect(navigator).toBeInstanceOf(Navigator)
    })
  })
})
