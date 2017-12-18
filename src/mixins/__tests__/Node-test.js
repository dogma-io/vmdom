import NodeList from '../../NodeList'
import nodeMixin from '../Node'

class Superclass {}
const NodeClass = nodeMixin(Superclass)

describe('EventTarget', () => {
  let instance

  beforeEach(() => {
    instance = new NodeClass()
  })

  it('should not have any childNodes on instantiation and has correct enumerables', () => {
    expect(instance._childNodes).toEqual([])
    expect(instance.childNodes).toBeInstanceOf(NodeList)
    expect(instance.childNodes).toHaveLength(0)
    expect(instance).toHaveEnumerables([])
  })

  it('should not allow _childNodes property to be overwritten', () => {
    expect(() => {
      instance._childNodes = 'foobar'
    }).toThrowError(TypeError)
  })

  it('should not allow childNodes property to be overwritten', () => {
    expect(instance.childNodes = 'foobar').toBe('foobar')
    expect(instance.childNodes).not.toBe('foobar')
  })

  describe('appendChild()', () => {
    it('should append child to list', () => {
      const child = new NodeClass()
      expect(instance.appendChild(child)).toBe(child)
      expect(instance._childNodes).toEqual([child])
      expect(instance.childNodes).toHaveLength(1)
    })
  })
})
