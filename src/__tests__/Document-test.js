import Document from '../Document'
import HTMLBodyElement from '../HTMLBodyElement'
import UnmockedHTMLElement from '../HTMLElement'
import HTMLHeadElement from '../HTMLHeadElement'

jest.doMock('../HTMLElement', () => {
  return jest.fn((...args) => {
    return UnmockedHTMLElement(...args)
  })
})

const HTMLElement = require('../HTMLElement')

describe('Document', () => {
  let instance

  describe('when includeBody option is set to true', () => {
    describe('when includeHead option is set to true', () => {
      beforeEach(() => {
        instance = new Document({
          includeBody: true,
          includeHead: true,
        })
      })

      it('should implement expected interfaces and has correct enumerables', () => {
        expect(instance).toImplementEventTarget()
        expect(instance).toImplementNode()
        expect(instance).toHaveEnumerables([])
      })

      it('should not instantiate classes for lazily load properties', () => {
        expect(HTMLElement).not.toHaveBeenCalled()
      })

      describe('when documentElement property accessed', () => {
        let documentElement

        beforeEach(() => {
          documentElement = instance.documentElement
        })

        it('should instantiate document property', () => {
          expect(documentElement).toBeInstanceOf(UnmockedHTMLElement)
          expect(documentElement.childNodes).toHaveLength(2)
          expect(documentElement.childNodes[0]).toBeInstanceOf(HTMLHeadElement)
          expect(documentElement.childNodes[1]).toBeInstanceOf(HTMLBodyElement)
        })

        it('should return same instance when accessed a second time', () => {
          expect(instance.documentElement).toBe(documentElement)
        })
      })
    })

    describe('when includeHead option is set to false', () => {
      beforeEach(() => {
        instance = new Document({
          includeBody: true,
          includeHead: false,
        })
      })

      it('should implement expected interfaces and has correct enumerables', () => {
        expect(instance).toImplementEventTarget()
        expect(instance).toImplementNode()
        expect(instance).toHaveEnumerables([])
      })

      it('should not instantiate classes for lazily load properties', () => {
        expect(HTMLElement).not.toHaveBeenCalled()
      })

      describe('when documentElement property accessed', () => {
        let documentElement

        beforeEach(() => {
          documentElement = instance.documentElement
        })

        it('should instantiate document property', () => {
          expect(documentElement).toBeInstanceOf(UnmockedHTMLElement)
          expect(documentElement.childNodes).toHaveLength(1)
          expect(documentElement.childNodes[0]).toBeInstanceOf(HTMLBodyElement)
        })

        it('should return same instance when accessed a second time', () => {
          expect(instance.documentElement).toBe(documentElement)
        })
      })
    })
  })

  describe('when includeBody option is set to false', () => {
    describe('when includeHead option is set to true', () => {
      beforeEach(() => {
        instance = new Document({
          includeBody: false,
          includeHead: true,
        })
      })

      it('should implement expected interfaces and has correct enumerables', () => {
        expect(instance).toImplementEventTarget()
        expect(instance).toImplementNode()
        expect(instance).toHaveEnumerables([])
      })

      it('should not instantiate classes for lazily load properties', () => {
        expect(HTMLElement).not.toHaveBeenCalled()
      })

      describe('when documentElement property accessed', () => {
        let documentElement

        beforeEach(() => {
          documentElement = instance.documentElement
        })

        it('should instantiate document property', () => {
          expect(documentElement).toBeInstanceOf(UnmockedHTMLElement)
          expect(documentElement.childNodes).toHaveLength(1)
          expect(documentElement.childNodes[0]).toBeInstanceOf(HTMLHeadElement)
        })

        it('should return same instance when accessed a second time', () => {
          expect(instance.documentElement).toBe(documentElement)
        })
      })
    })

    describe('when includeHead option is set to false', () => {
      beforeEach(() => {
        instance = new Document({
          includeBody: false,
          includeHead: false,
        })
      })

      it('should implement expected interfaces and has correct enumerables', () => {
        expect(instance).toImplementEventTarget()
        expect(instance).toImplementNode()
        expect(instance).toHaveEnumerables([])
      })

      it('should not instantiate classes for lazily load properties', () => {
        expect(HTMLElement).not.toHaveBeenCalled()
      })

      describe('when documentElement property accessed', () => {
        let documentElement

        beforeEach(() => {
          documentElement = instance.documentElement
        })

        it('should instantiate document property', () => {
          expect(documentElement).toBeInstanceOf(UnmockedHTMLElement)
          expect(documentElement.childNodes).toHaveLength(0)
        })

        it('should return same instance when accessed a second time', () => {
          expect(instance.documentElement).toBe(documentElement)
        })
      })
    })
  })
})
