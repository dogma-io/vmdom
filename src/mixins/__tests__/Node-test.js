import NodeList from '../../NodeList'
import nodeMixin from '../Node'

class SuperclassOne {}

class SuperclassTwo {
  static destroy() {
    //
  }
}

const NodeClassOne = nodeMixin(SuperclassOne)
const NodeClassTwo = nodeMixin(SuperclassTwo)

describe('EventTarget', () => {
  let instance

  beforeEach(() => {
    instance = new NodeClassOne()
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
    expect((instance.childNodes = 'foobar')).toBe('foobar')
    expect(instance.childNodes).not.toBe('foobar')
  })

  describe('appendChild()', () => {
    it('should append child to list', () => {
      const child = new NodeClassOne()
      expect(instance.appendChild(child)).toBe(child)
      expect(instance._childNodes).toEqual([child])
      expect(instance.childNodes).toHaveLength(1)
    })
  })

  it('destroy() should destroy child nodes', () => {
    jest.spyOn(NodeClassOne, 'destroy')
    jest.spyOn(NodeClassTwo, 'destroy')

    const child1 = new NodeClassOne()
    const child2 = new NodeClassTwo()

    instance._childNodes.push(child1, child2)

    NodeClassOne.destroy(instance)

    expect(NodeClassOne.destroy).toHaveBeenCalledTimes(2)
    expect(NodeClassOne.destroy).toHaveBeenCalledWith(child1)
    expect(NodeClassTwo.destroy).toHaveBeenCalledTimes(1)
    expect(NodeClassTwo.destroy).toHaveBeenCalledWith(child2)
    expect(instance._childNodes).toHaveLength(0)

    NodeClassOne.destroy.mockRestore()
    NodeClassTwo.destroy.mockRestore()
  })
})
