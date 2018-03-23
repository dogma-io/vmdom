jest.mock('../DocumentType')

import DOMImplementation from '../DOMImplementation'
import DocumentType from '../DocumentType'

describe('DOMImplementation', () => {
  let instance

  beforeEach(() => {
    instance = new DOMImplementation()
  })

  describe('createDocument()', () => {
    it('should not be overwritable', () => {
      expect(() => {
        instance.createDocument = 'foo'
      }).toThrow(TypeError)
    })
  })

  describe('createDocumentType()', () => {
    it('should not be overwritable', () => {
      expect(() => {
        instance.createDocumentType = 'foo'
      }).toThrow(TypeError)
    })

    it('should return new document type with passed in arguments', () => {
      const qualifierName = 'svg:svg'
      const publicId = '-//W3C//DTD SVG 1.1//EN'
      const systemId = 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'

      expect(
        instance.createDocumentType(qualifierName, publicId, systemId),
      ).toBeInstanceOf(DocumentType)
      expect(DocumentType).toBeCalledWith(qualifierName, publicId, systemId)
    })
  })

  describe('createHTMLDocument()', () => {
    it('should not be overwritable', () => {
      expect(() => {
        instance.createHTMLDocument = 'foo'
      }).toThrow(TypeError)
    })
  })

  describe('hasFeature()', () => {
    it('should not be overwritable', () => {
      expect(() => {
        instance.hasFeature = 'foo'
      }).toThrow(TypeError)
    })

    it('should return true', () => {
      expect(instance.hasFeature('foo', '1.0')).toBe(true)
    })
  })
})
