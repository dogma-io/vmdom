/**
 * @format
 */

import DocumentFragment from '../DocumentFragment'
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
        expect(instance.childNodes).toHaveLength(1)
        expect(instance.childNodes[0]).toBe(child)
      })
    })

    it('destroy() should destroy child nodes', () => {
      jest.spyOn(Node, 'destroy')

      const child1 = new Node()
      const child2 = new Node()

      instance.appendChild(child1)
      instance.appendChild(child2)

      instance.constructor.destroy(instance)

      expect(Node.destroy.mock.calls.length).toBeGreaterThanOrEqual(2)
      expect(Node.destroy).toHaveBeenCalledWith(child1)
      expect(Node.destroy).toHaveBeenCalledWith(child2)
      expect(instance.childNodes).toHaveLength(0)

      Node.destroy.mockRestore()
    })

    describe('hasChildNodes()', () => {
      it('should return false when no child nodes', () => {
        expect(instance.hasChildNodes()).toBe(false)
      })

      it('should return true when one child node', () => {
        instance.appendChild(new Node())
        expect(instance.hasChildNodes()).toBe(true)
      })

      it('should return true when multiple child nodes', () => {
        instance.appendChild(new Node())
        instance.appendChild(new Node())
        expect(instance.hasChildNodes()).toBe(true)
      })
    })

    describe('insertBefore()', () => {
      it('should throw when first argument is not a Node', () => {
        expect(() => {
          instance.insertBefore({}, new Node())
        }).toThrow(
          /Failed to execute 'insertBefore' on 'Node': parameter 1 is not of type 'Node'\./,
        )
      })

      it('should throw when second argument is not a Node', () => {
        expect(() => {
          instance.insertBefore(new Node(), {})
        }).toThrow(
          /Failed to execute 'insertBefore' on 'Node': parameter 2 is not of type 'Node'\./,
        )
      })

      it('should throw when second argument is not a child of node', () => {
        expect(() => {
          instance.insertBefore(new Node(), new Node())
        }).toThrow(
          /Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node\./,
        )
      })

      describe('when inserting a document fragment', () => {
        let fragment, newChildOne, newChildTwo, oldChild

        beforeEach(() => {
          newChildOne = new Node()
          newChildTwo = new Node()
          fragment = new DocumentFragment()
          oldChild = new Node()
          fragment.appendChild(newChildOne)
          fragment.appendChild(newChildTwo)
          instance.appendChild(oldChild)
        })

        it('should insert new child at end of node when reference is null', () => {
          expect(instance.insertBefore(fragment, null)).toBe(fragment)
          expect(instance.childNodes).toHaveLength(3)
          expect(instance.childNodes[0]).toBe(oldChild)
          expect(instance.childNodes[1]).toBe(newChildOne)
          expect(instance.childNodes[2]).toBe(newChildTwo)
          expect(fragment.childNodes).toHaveLength(0)
        })

        it('should insert new child before referenced node', () => {
          expect(instance.insertBefore(fragment, oldChild)).toBe(fragment)
          expect(instance.childNodes).toHaveLength(3)
          expect(instance.childNodes[0]).toBe(newChildOne)
          expect(instance.childNodes[1]).toBe(newChildTwo)
          expect(instance.childNodes[2]).toBe(oldChild)
          expect(fragment.childNodes).toHaveLength(0)
        })
      })

      describe('when inserting a non-document fragment node', () => {
        let newChild, oldChild

        beforeEach(() => {
          newChild = new Node()
          oldChild = new Node()
          instance.appendChild(oldChild)
        })

        it('should insert new child at end of node when reference is null', () => {
          expect(instance.insertBefore(newChild, null)).toBe(newChild)
          expect(instance.childNodes).toHaveLength(2)
          expect(instance.childNodes[0]).toBe(oldChild)
          expect(instance.childNodes[1]).toBe(newChild)
        })

        it('should insert new child before referenced node', () => {
          expect(instance.insertBefore(newChild, oldChild)).toBe(newChild)
          expect(instance.childNodes).toHaveLength(2)
          expect(instance.childNodes[0]).toBe(newChild)
          expect(instance.childNodes[1]).toBe(oldChild)
        })
      })
    })

    describe('isSameNode()', () => {
      it('should return true when same node', () => {
        const node = new Node()
        expect(node.isSameNode(new Node())).toBe(false)
      })

      it('should return false when different nodes', () => {
        const node = new Node()
        expect(node.isSameNode(node)).toBe(true)
      })
    })

    describe('removeChild()', () => {
      it('should throw when child is not a Node', () => {
        expect(() => {
          instance.removeChild('foobar')
        }).toThrow(
          /Failed to execute 'removeChild' on 'Node': parameter 1 is not of type 'Node'\./,
        )
      })

      it('should throw when child is not actually a child of node', () => {
        expect(() => {
          instance.removeChild(new Node())
        }).toThrow(
          /Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node\./,
        )
      })

      it('should remove child when it is a child of node', () => {
        const child = new Node()
        instance.appendChild(child)
        expect(instance.removeChild(child)).toBe(child)
        expect(instance.childNodes).toHaveLength(0)
      })
    })

    describe('replaceChild()', () => {
      it('should throw when first argument is not a Node', () => {
        expect(() => {
          instance.replaceChild({}, new Node())
        }).toThrow(
          /Failed to execute 'replaceChild' on 'Node': parameter 1 is not of type 'Node'\./,
        )
      })

      it('should throw when second argument is not a Node', () => {
        expect(() => {
          instance.replaceChild(new Node(), {})
        }).toThrow(
          /Failed to execute 'replaceChild' on 'Node': parameter 2 is not of type 'Node'\./,
        )
      })

      it('should throw when second argument is not a child of node', () => {
        expect(() => {
          instance.replaceChild(new Node(), new Node())
        }).toThrow(
          /Failed to execute 'replaceChild' on 'Node': The node to be replaced is not a child of this node\./,
        )
      })

      it('should replace child when second argument is a child of node', () => {
        const newChild = new Node()
        const oldChild = new Node()

        instance.appendChild(oldChild)

        expect(instance.replaceChild(newChild, oldChild)).toBe(oldChild)
        expect(instance.childNodes).toHaveLength(1)
        expect(instance.childNodes[0]).toBe(newChild)
      })
    })
  })
}
