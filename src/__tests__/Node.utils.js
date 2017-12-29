/**
 * @format
 */

import Node from '../Node'
import NodeList from '../NodeList'
import {itShouldImplementEventTargetInterface} from '../mixins/__tests__/EventTarget.utils'

export function itShouldImplementNodeInterface(getInstance) {
  itShouldImplementEventTargetInterface(getInstance)

  describe('Node interface', () => {
    let instance

    beforeEach(() => {
      instance = getInstance()
    })

    it('should not have any childNodes on instantiation', () => {
      expect(instance._childNodes).toEqual([])
      expect(instance.childNodes).toBeInstanceOf(NodeList)
      expect(instance.childNodes).toHaveLength(0)
    })

    it('should not allow _childNodes property to be overwritten', () => {
      expect(() => {
        instance._childNodes = 'foobar'
      }).toThrow(TypeError)
    })

    it('should not allow childNodes property to be overwritten', () => {
      expect((instance.childNodes = 'foobar')).toBe('foobar')
      expect(instance.childNodes).not.toBe('foobar')
    })

    describe('appendChild()', () => {
      it('should append child to list', () => {
        const child = new Node()
        expect(instance.appendChild(child)).toBe(child)
        expect(instance._childNodes).toEqual([child])
        expect(instance.childNodes).toHaveLength(1)
      })
    })

    it('destroy() should destroy child nodes', () => {
      jest.spyOn(Node, 'destroy')

      const child1 = new Node()
      const child2 = new Node()

      instance._childNodes.push(child1, child2)

      instance.constructor.destroy(instance)

      expect(Node.destroy.mock.calls.length).toBeGreaterThanOrEqual(2)
      expect(Node.destroy).toHaveBeenCalledWith(child1)
      expect(Node.destroy).toHaveBeenCalledWith(child2)
      expect(instance._childNodes).toHaveLength(0)

      Node.destroy.mockRestore()
    })

    describe('removeChild()', () => {
      it('should throw when child is not a Node', () => {
        expect(() => {
          instance.removeChild('foobar')
        }).toThrow(TypeError)
      })

      it('should throw when child is not actually a child of node', () => {
        expect(() => {
          instance.removeChild(new Node())
        }).toThrow(/DOMException/)
      })

      it('should remove child when it is a child of node', () => {
        const child = new Node()
        instance._childNodes.push(child)
        expect(instance.removeChild(child)).toBe(child)
        expect(instance._childNodes).toHaveLength(0)
      })
    })
  })
}
