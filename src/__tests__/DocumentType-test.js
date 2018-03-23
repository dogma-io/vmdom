import DocumentType from '../DocumentType'
import {itShouldImplementNodeInterface} from './Node.utils'

const NAME = ''
const PUBLIC_ID = ''
const SYSTEM_ID = ''

describe('DocumentType', () => {
  let instance

  beforeEach(() => {
    instance = new DocumentType(NAME, PUBLIC_ID, SYSTEM_ID)
  })

  it('should have expected enumerables', () => {
    expect(instance).toHaveEnumerables([])
  })

  it('should return passed in name for name property', () => {
    expect(instance.name).toBe(NAME)
  })

  it('should not allow name property to be overwritten', () => {
    expect(() => {
      instance.name = 'foobar'
    }).toThrow(TypeError)
  })

  it('should return passed in public identifier for publicId property', () => {
    expect(instance.publicId).toBe(PUBLIC_ID)
  })

  it('should not allow publicId property to be overwritten', () => {
    expect(() => {
      instance.publicId = 'foobar'
    }).toThrow(TypeError)
  })

  it('should return passed in system identifier for systemId property', () => {
    expect(instance.systemId).toBe(SYSTEM_ID)
  })

  it('should not allow systemId property to be overwritten', () => {
    expect(() => {
      instance.systemId = 'foobar'
    }).toThrow(TypeError)
  })

  itShouldImplementNodeInterface(() => instance)
})
