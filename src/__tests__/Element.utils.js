/**
 * @format
 */

import HTMLDivElement from '../HTMLDivElement'
import HTMLParagraphElement from '../HTMLParagraphElement'
import Text from '../Text'
import {itShouldImplementNodeInterface} from './Node.utils'

export function itShouldBeAnElement(getInstance, tagName) {
  itShouldImplementNodeInterface(getInstance)

  describe('Element interface', () => {
    let instance

    beforeEach(() => {
      instance = getInstance()
    })

    it('should return correct tagName property', () => {
      expect(instance.tagName).toBe(tagName)
    })

    it('should not have any attributes or namespace attributes', () => {
      expect(instance._attributes).toHaveEnumerables([])
      expect(instance._namespaceAttributes).toHaveEnumerables([])
    })

    it('should not allow _attributes property to be overwritten', () => {
      expect(() => {
        instance._attributes = 'foobar'
      }).toThrow(TypeError)
    })

    it('should not allow _namespaceAttributes property to be overwritten', () => {
      expect(() => {
        instance._namespaceAttributes = 'foobar'
      }).toThrow(TypeError)
    })

    it('should not allow tagName property to be overwritten', () => {
      expect(() => {
        instance.tagName = 'foobar'
      }).toThrow(TypeError)
    })

    describe('getAttribute()', () => {
      it('should return null if attribute not present', () => {
        expect(instance.getAttribute('foo')).toBe(null)
      })

      it('should get boolean attribute', () => {
        instance._attributes.true = 'bar'
        expect(instance.getAttribute(true)).toBe('bar')
      })

      it('should get null attribute', () => {
        instance._attributes.null = 'bar'
        expect(instance.getAttribute(null)).toBe('bar')
      })

      it('should get numeric attribute', () => {
        instance._attributes['1'] = 'bar'
        expect(instance.getAttribute(1)).toBe('bar')
      })

      it('should get string attribute', () => {
        instance._attributes.foo = 'bar'
        expect(instance.getAttribute('foo')).toBe('bar')
      })

      it('should throw for symbol attribute', () => {
        expect(() => {
          instance.getAttribute(Symbol('foo'))
        }).toThrow(TypeError)
      })

      it('should get undefined attribute', () => {
        instance._attributes.undefined = 'bar'
        expect(instance.getAttribute(undefined)).toBe('bar')
      })
    })

    describe('getAttributeNames()', () => {
      describe('when attributes', () => {
        beforeEach(() => {
          instance._attributes.foo = '1'
          instance._attributes.bar = '2'
        })

        describe('when multiple namespaces present', () => {
          beforeEach(() => {
            instance._namespaceAttributes.dogma = {}
            instance._namespaceAttributes.baz = {}
          })

          it('should return expected keys when both namespaces have attributes', () => {
            instance._namespaceAttributes.dogma.alpha = '1'
            instance._namespaceAttributes.dogma.bravo = '2'
            instance._namespaceAttributes.baz.charlie = '3'
            instance._namespaceAttributes.baz.delta = '4'
            expect(instance.getAttributeNames()).toEqual([
              'foo',
              'bar',
              'alpha',
              'bravo',
              'charlie',
              'delta',
            ])
          })

          it('should return expected keys when first namespace has attributes', () => {
            instance._namespaceAttributes.dogma.alpha = '1'
            instance._namespaceAttributes.dogma.bravo = '2'
            expect(instance.getAttributeNames()).toEqual([
              'foo',
              'bar',
              'alpha',
              'bravo',
            ])
          })

          it('should return expected keys when second namespace has attributes', () => {
            instance._namespaceAttributes.baz.alpha = '1'
            instance._namespaceAttributes.baz.bravo = '2'
            expect(instance.getAttributeNames()).toEqual([
              'foo',
              'bar',
              'alpha',
              'bravo',
            ])
          })

          it("should return expected keys when namespaces don't not have attributes", () => {
            expect(instance.getAttributeNames()).toEqual(['foo', 'bar'])
          })
        })

        describe('when one namespace present', () => {
          beforeEach(() => {
            instance._namespaceAttributes.dogma = {}
          })

          it('should return expected keys when namespace has attributes', () => {
            instance._namespaceAttributes.dogma.alpha = '1'
            instance._namespaceAttributes.dogma.bravo = '2'
            expect(instance.getAttributeNames()).toEqual([
              'foo',
              'bar',
              'alpha',
              'bravo',
            ])
          })

          it('should return expected keys when namespace does not have attributes', () => {
            expect(instance.getAttributeNames()).toEqual(['foo', 'bar'])
          })
        })

        it('should return empty array when no namespaces present', () => {
          expect(instance.getAttributeNames()).toEqual(['foo', 'bar'])
        })
      })

      describe('when no non-namespaced attrubites', () => {
        describe('when multiple namespaces present', () => {
          beforeEach(() => {
            instance._namespaceAttributes.dogma = {}
            instance._namespaceAttributes.baz = {}
          })

          it('should return expected keys when both namespaces have attributes', () => {
            instance._namespaceAttributes.dogma.alpha = '1'
            instance._namespaceAttributes.dogma.bravo = '2'
            instance._namespaceAttributes.baz.charlie = '3'
            instance._namespaceAttributes.baz.delta = '4'
            expect(instance.getAttributeNames()).toEqual([
              'alpha',
              'bravo',
              'charlie',
              'delta',
            ])
          })

          it('should return expected keys when first namespace has attributes', () => {
            instance._namespaceAttributes.dogma.alpha = '1'
            instance._namespaceAttributes.dogma.bravo = '2'
            expect(instance.getAttributeNames()).toEqual(['alpha', 'bravo'])
          })

          it('should return expected keys when second namespace has attributes', () => {
            instance._namespaceAttributes.baz.alpha = '1'
            instance._namespaceAttributes.baz.bravo = '2'
            expect(instance.getAttributeNames()).toEqual(['alpha', 'bravo'])
          })

          it("should return empty array when namespaces don't not have attributes", () => {
            expect(instance.getAttributeNames()).toEqual([])
          })
        })

        describe('when one namespace present', () => {
          beforeEach(() => {
            instance._namespaceAttributes.dogma = {}
          })

          it('should return expected keys when namespace has attributes', () => {
            instance._namespaceAttributes.dogma.alpha = '1'
            instance._namespaceAttributes.dogma.bravo = '2'
            expect(instance.getAttributeNames()).toEqual(['alpha', 'bravo'])
          })

          it('should return empty array when namespace does not have attributes', () => {
            expect(instance.getAttributeNames()).toEqual([])
          })
        })

        it('should return empty array when no namespaces present', () => {
          expect(instance.getAttributeNames()).toEqual([])
        })
      })
    })

    describe('getAttributeNS()', () => {
      it('should return null when namespace not present', () => {
        expect(instance.getAttributeNS('dogma', 'foo')).toBe(null)
      })

      describe('when namespace present', () => {
        beforeEach(() => {
          instance._namespaceAttributes.dogma = {}
        })

        it('should return null if attribute not present', () => {
          expect(instance.getAttributeNS('dogma', 'foo')).toBe(null)
        })

        it('should get boolean attribute', () => {
          instance._namespaceAttributes.dogma.true = 'bar'
          expect(instance.getAttributeNS('dogma', true)).toBe('bar')
        })

        it('should get null attribute', () => {
          instance._namespaceAttributes.dogma.null = 'bar'
          expect(instance.getAttributeNS('dogma', null)).toBe('bar')
        })

        it('should get numeric attribute', () => {
          instance._namespaceAttributes.dogma['1'] = 'bar'
          expect(instance.getAttributeNS('dogma', 1)).toBe('bar')
        })

        it('should get string attribute', () => {
          instance._namespaceAttributes.dogma.foo = 'bar'
          expect(instance.getAttributeNS('dogma', 'foo')).toBe('bar')
        })

        it('should throw for symbol attribute', () => {
          expect(() => {
            instance.getAttributeNS('dogma', Symbol('foo'))
          }).toThrow(TypeError)
        })

        it('should get undefined attribute', () => {
          instance._namespaceAttributes.dogma.undefined = 'bar'
          expect(instance.getAttributeNS('dogma', undefined)).toBe('bar')
        })
      })
    })

    describe('getElementsByTagName()', () => {
      it('should return empty list when no children', () => {
        expect(instance.getElementsByTagName('div')).toEqual([])
      })

      it('should return empty list when no children with tag name', () => {
        instance.appendChild(new HTMLParagraphElement())
        expect(instance.getElementsByTagName('div')).toEqual([])
      })

      it('should return expected list when all children have tag name', () => {
        const childOne = new HTMLDivElement()
        const childTwo = new HTMLDivElement()
        instance.appendChild(childOne)
        instance.appendChild(childTwo)
        expect(instance.getElementsByTagName('div')).toEqual([
          childOne,
          childTwo,
        ])
      })

      it('should return expected list when some children have tag name', () => {
        const childOne = new HTMLDivElement()
        const childTwo = new Text()
        const childThree = new HTMLDivElement()
        instance.appendChild(childOne)
        instance.appendChild(childTwo)
        instance.appendChild(childThree)
        expect(instance.getElementsByTagName('div')).toEqual([
          childOne,
          childThree,
        ])
      })

      it('should return expected list when nested children have tag name', () => {
        const childOne = new HTMLParagraphElement()
        const childTwo = new HTMLDivElement()
        instance.appendChild(childOne)
        childOne.appendChild(childTwo)
        expect(instance.getElementsByTagName('div')).toEqual([childTwo])
      })
    })

    describe('hasAttribute()', () => {
      it('should return true for present boolean attribute', () => {
        instance._attributes.true = 'foo'
        expect(instance.hasAttribute(true)).toBe(true)
      })

      it('should return false for non-present boolean attribute', () => {
        expect(instance.hasAttribute(true)).toBe(false)
      })

      it('should return true for present null attribute', () => {
        instance._attributes.null = 'foo'
        expect(instance.hasAttribute(null)).toBe(true)
      })

      it('should return false for non-present null attribute', () => {
        expect(instance.hasAttribute(null)).toBe(false)
      })

      it('should return true for present numeric attribute', () => {
        instance._attributes['1'] = 'foo'
        expect(instance.hasAttribute(1)).toBe(true)
      })

      it('should return false for non-present numeric attribute', () => {
        expect(instance.hasAttribute(1)).toBe(false)
      })

      it('should throw when symbol attribute', () => {
        expect(() => {
          instance.hasAttribute(Symbol('foo'))
        }).toThrow(TypeError)
      })

      it('should return true for present undefined attribute', () => {
        instance._attributes.undefined = 'foo'
        expect(instance.hasAttribute(undefined)).toBe(true)
      })

      it('should return false for non-present undefined attribute', () => {
        expect(instance.hasAttribute(undefined)).toBe(false)
      })
    })

    describe('hasAttributeNS()', () => {
      describe('when namespace not present', () => {
        it('should return false for non-present boolean attribute', () => {
          expect(instance.hasAttributeNS('dogma', true)).toBe(false)
        })

        it('should return false for non-present null attribute', () => {
          expect(instance.hasAttributeNS('dogma', null)).toBe(false)
        })

        it('should return false for non-present numeric attribute', () => {
          expect(instance.hasAttributeNS('dogma', 1)).toBe(false)
        })

        it('should throw when symbol attribute', () => {
          expect(() => {
            instance.hasAttributeNS('dogma', Symbol('foo'))
          }).toThrow(TypeError)
        })

        it('should return false for non-present undefined attribute', () => {
          expect(instance.hasAttributeNS('dogma', undefined)).toBe(false)
        })
      })

      describe('when namespace present', () => {
        beforeEach(() => {
          instance._namespaceAttributes.dogma = {}
        })

        it('should return true for present boolean attribute', () => {
          instance._namespaceAttributes.dogma.true = 'foo'
          expect(instance.hasAttributeNS('dogma', true)).toBe(true)
        })

        it('should return false for non-present boolean attribute', () => {
          expect(instance.hasAttributeNS('dogma', true)).toBe(false)
        })

        it('should return true for present null attribute', () => {
          instance._namespaceAttributes.dogma.null = 'foo'
          expect(instance.hasAttributeNS('dogma', null)).toBe(true)
        })

        it('should return false for non-present null attribute', () => {
          expect(instance.hasAttributeNS('dogma', null)).toBe(false)
        })

        it('should return true for present numeric attribute', () => {
          instance._namespaceAttributes.dogma['1'] = 'foo'
          expect(instance.hasAttributeNS('dogma', 1)).toBe(true)
        })

        it('should return false for non-present numeric attribute', () => {
          expect(instance.hasAttributeNS('dogma', 1)).toBe(false)
        })

        it('should throw when symbol attribute', () => {
          expect(() => {
            instance.hasAttributeNS('dogma', Symbol('foo'))
          }).toThrow(TypeError)
        })

        it('should return true for present undefined attribute', () => {
          instance._namespaceAttributes.dogma.undefined = 'foo'
          expect(instance.hasAttributeNS('dogma', undefined)).toBe(true)
        })

        it('should return false for non-present undefined attribute', () => {
          expect(instance.hasAttributeNS('dogma', undefined)).toBe(false)
        })
      })
    })

    describe('hasAttributes()', () => {
      describe('when non-namepaced attributes present', () => {
        beforeEach(() => {
          instance._attributes.foo = 'bar'
        })

        it('should return true when no namespaced attributes present', () => {
          expect(instance.hasAttributes()).toBe(true)
        })

        it('should return true when namespaced present without attributes', () => {
          instance._namespaceAttributes.dogma = {}
          expect(instance.hasAttributes()).toBe(true)
        })

        it('should return true when namespaced attributes present', () => {
          instance._namespaceAttributes.dogma = {foo: 'bar'}
          expect(instance.hasAttributes()).toBe(true)
        })
      })

      describe('when non-namespaced attributes not present', () => {
        it('should return false when no namespaced attributes present', () => {
          expect(instance.hasAttributes()).toBe(false)
        })

        it('should return false when namespaced present without attributes', () => {
          instance._namespaceAttributes.dogma = {}
          expect(instance.hasAttributes()).toBe(false)
        })

        it('should return true when namespaced attributes present', () => {
          instance._namespaceAttributes.dogma = {foo: 'bar'}
          expect(instance.hasAttributes()).toBe(true)
        })
      })
    })

    describe('removeAttribute()', () => {
      it('should not throw when there is no attribute to remove', () => {
        expect(() => {
          instance.removeAttribute('foo')
        }).not.toThrow()
      })

      it('should remove boolean attribute', () => {
        instance._attributes.true = 'foo'
        expect(instance.removeAttribute(true)).toBe(undefined)
        expect(instance._attributes.true).toBe(undefined)
      })

      it('should remove null attribute', () => {
        instance._attributes.null = 'foo'
        expect(instance.removeAttribute(null)).toBe(undefined)
        expect(instance._attributes.null).toBe(undefined)
      })

      it('should remove numeric attribute', () => {
        instance._attributes['1'] = 'foo'
        expect(instance.removeAttribute(1)).toBe(undefined)
        expect(instance._attributes['1']).toBe(undefined)
      })

      it('should throw when symbol attribute', () => {
        expect(() => {
          instance.removeAttribute(Symbol('foo'))
        }).toThrow(TypeError)
      })

      it('should remove undefined attribute', () => {
        instance._attributes.undefined = 'foo'
        expect(instance.removeAttribute(undefined)).toBe(undefined)
        expect(instance._attributes.undefined).toBe(undefined)
      })
    })

    describe('removeAttributeNS()', () => {
      describe('when namespace not present', () => {
        it('should not throw when there is no attribute to remove', () => {
          expect(() => {
            instance.removeAttributeNS('dogma', 'foo')
          }).not.toThrow()
        })
      })

      describe('when namespace present', () => {
        beforeEach(() => {
          instance._namespaceAttributes.dogma = {}
        })

        it('should not throw when there is no attribute to remove', () => {
          expect(() => {
            instance.removeAttributeNS('dogma', 'foo')
          }).not.toThrow()
        })

        it('should remove boolean attribute', () => {
          instance._namespaceAttributes.dogma.true = 'foo'
          expect(instance.removeAttributeNS('dogma', true)).toBe(undefined)
          expect(instance._namespaceAttributes.dogma.true).toBe(undefined)
        })

        it('should remove null attribute', () => {
          instance._namespaceAttributes.dogma.null = 'foo'
          expect(instance.removeAttributeNS('dogma', null)).toBe(undefined)
          expect(instance._namespaceAttributes.dogma.null).toBe(undefined)
        })

        it('should remove numeric attribute', () => {
          instance._namespaceAttributes.dogma['1'] = 'foo'
          expect(instance.removeAttributeNS('dogma', 1)).toBe(undefined)
          expect(instance._namespaceAttributes.dogma['1']).toBe(undefined)
        })

        it('should throw when symbol attribute', () => {
          expect(() => {
            instance.removeAttributeNS('dogma', Symbol('foo'))
          }).toThrow(TypeError)
        })

        it('should remove undefined attribute', () => {
          instance._namespaceAttributes.dogma.undefined = 'foo'
          expect(instance.removeAttributeNS('dogma', undefined)).toBe(undefined)
          expect(instance._namespaceAttributes.dogma.undefined).toBe(undefined)
        })
      })
    })

    describe('setAttribute()', () => {
      it('should add boolean attribute when not already present', () => {
        expect(instance.setAttribute(true, 'bar')).toBe(undefined)
        expect(instance._attributes.true).toBe('bar')
      })

      it('should update boolean attribute when already present', () => {
        instance._attributes.true = 'bar'
        expect(instance.setAttribute(true, 'bar')).toBe(undefined)
        expect(instance._attributes.true).toBe('bar')
      })

      it('should add null attribute when not already present', () => {
        expect(instance.setAttribute(null, 'bar')).toBe(undefined)
        expect(instance._attributes.null).toBe('bar')
      })

      it('should update null attribute when already present', () => {
        instance._attributes.null = 'bar'
        expect(instance.setAttribute(null, 'bar')).toBe(undefined)
        expect(instance._attributes.null).toBe('bar')
      })

      it('should add number attribute when not already present', () => {
        expect(instance.setAttribute(1, 'bar')).toBe(undefined)
        expect(instance._attributes['1']).toBe('bar')
      })

      it('should update number attribute when already present', () => {
        instance._attributes['1'] = 'bar'
        expect(instance.setAttribute(1, 'bar')).toBe(undefined)
        expect(instance._attributes['1']).toBe('bar')
      })

      it('should add string attribute when not already present', () => {
        expect(instance.setAttribute('foo', 'bar')).toBe(undefined)
        expect(instance._attributes.foo).toBe('bar')
      })

      it('should update string attribute when already present', () => {
        instance._attributes.foo = 'bar'
        expect(instance.setAttribute('foo', 'bar')).toBe(undefined)
        expect(instance._attributes.foo).toBe('bar')
      })

      it('should throw when adding a symbol attribute', () => {
        expect(() => {
          instance.setAttribute(Symbol('foo'), 'bar')
        }).toThrow(TypeError)
      })

      it('should add undefined attribute when not already present', () => {
        expect(instance.setAttribute(undefined, 'bar')).toBe(undefined)
        expect(instance._attributes.undefined).toBe('bar')
      })

      it('should update undefined attribute when already present', () => {
        instance._attributes.undefined = 'bar'
        expect(instance.setAttribute(undefined, 'bar')).toBe(undefined)
        expect(instance._attributes.undefined).toBe('bar')
      })

      it('should convert boolean value into string', () => {
        expect(instance.setAttribute('foo', true)).toBe(undefined)
        expect(instance._attributes.foo).toBe('true')
      })

      it('should convert numeric value into string', () => {
        expect(instance.setAttribute('foo', 1)).toBe(undefined)
        expect(instance._attributes.foo).toBe('1')
      })

      it('should convert null value into string', () => {
        expect(instance.setAttribute('foo', null)).toBe(undefined)
        expect(instance._attributes.foo).toBe('null')
      })

      it('should throw when using a symbol value', () => {
        expect(() => {
          instance.setAttribute('foo', Symbol('bar'))
        }).toThrow(TypeError)
      })

      it('should convert undefined value into string', () => {
        expect(instance.setAttribute('foo', undefined)).toBe(undefined)
        expect(instance._attributes.foo).toBe('undefined')
      })
    })

    describe('setAttributeNS()', () => {
      describe('when namespace not present', () => {
        it('should add boolean attribute when not already present', () => {
          expect(instance.setAttributeNS('dogma', true, 'bar')).toBe(undefined)
          expect(instance._namespaceAttributes.dogma.true).toBe('bar')
        })

        it('should add null attribute when not already present', () => {
          expect(instance.setAttributeNS('dogma', null, 'bar')).toBe(undefined)
          expect(instance._namespaceAttributes.dogma.null).toBe('bar')
        })

        it('should add number attribute when not already present', () => {
          expect(instance.setAttributeNS('dogma', 1, 'bar')).toBe(undefined)
          expect(instance._namespaceAttributes.dogma['1']).toBe('bar')
        })

        it('should add string attribute when not already present', () => {
          expect(instance.setAttributeNS('dogma', 'foo', 'bar')).toBe(undefined)
          expect(instance._namespaceAttributes.dogma.foo).toBe('bar')
        })

        it('should throw when adding a symbol attribute', () => {
          expect(() => {
            instance.setAttributeNS('dogma', Symbol('foo'), 'bar')
          }).toThrow(TypeError)
        })

        it('should add undefined attribute when not already present', () => {
          expect(instance.setAttributeNS('dogma', undefined, 'bar')).toBe(
            undefined,
          )
          expect(instance._namespaceAttributes.dogma.undefined).toBe('bar')
        })

        it('should convert boolean value into string', () => {
          expect(instance.setAttributeNS('dogma', 'foo', true)).toBe(undefined)
          expect(instance._namespaceAttributes.dogma.foo).toBe('true')
        })

        it('should convert numeric value into string', () => {
          expect(instance.setAttributeNS('dogma', 'foo', 1)).toBe(undefined)
          expect(instance._namespaceAttributes.dogma.foo).toBe('1')
        })

        it('should convert null value into string', () => {
          expect(instance.setAttributeNS('dogma', 'foo', null)).toBe(undefined)
          expect(instance._namespaceAttributes.dogma.foo).toBe('null')
        })

        it('should throw when using a symbol value', () => {
          expect(() => {
            instance.setAttributeNS('dogma', 'foo', Symbol('bar'))
          }).toThrow(TypeError)
        })

        it('should convert undefined value into string', () => {
          expect(instance.setAttributeNS('dogma', 'foo', undefined)).toBe(
            undefined,
          )
          expect(instance._namespaceAttributes.dogma.foo).toBe('undefined')
        })
      })

      describe('when namespace present', () => {
        beforeEach(() => {
          instance._namespaceAttributes.dogma = {}
        })

        it('should add boolean attribute when not already present', () => {
          expect(instance.setAttributeNS('dogma', true, 'bar')).toBe(undefined)
          expect(instance._namespaceAttributes.dogma.true).toBe('bar')
        })

        it('should update boolean attribute when already present', () => {
          instance._namespaceAttributes.dogma.true = 'bar'
          expect(instance.setAttributeNS('dogma', true, 'bar')).toBe(undefined)
          expect(instance._namespaceAttributes.dogma.true).toBe('bar')
        })

        it('should add null attribute when not already present', () => {
          expect(instance.setAttributeNS('dogma', null, 'bar')).toBe(undefined)
          expect(instance._namespaceAttributes.dogma.null).toBe('bar')
        })

        it('should update null attribute when already present', () => {
          instance._namespaceAttributes.dogma.null = 'bar'
          expect(instance.setAttributeNS('dogma', null, 'bar')).toBe(undefined)
          expect(instance._namespaceAttributes.dogma.null).toBe('bar')
        })

        it('should add number attribute when not already present', () => {
          expect(instance.setAttributeNS('dogma', 1, 'bar')).toBe(undefined)
          expect(instance._namespaceAttributes.dogma['1']).toBe('bar')
        })

        it('should update number attribute when already present', () => {
          instance._attributes['1'] = 'bar'
          expect(instance.setAttributeNS('dogma', 1, 'bar')).toBe(undefined)
          expect(instance._namespaceAttributes.dogma['1']).toBe('bar')
        })

        it('should add string attribute when not already present', () => {
          expect(instance.setAttributeNS('dogma', 'foo', 'bar')).toBe(undefined)
          expect(instance._namespaceAttributes.dogma.foo).toBe('bar')
        })

        it('should update string attribute when already present', () => {
          instance._namespaceAttributes.dogma.foo = 'bar'
          expect(instance.setAttributeNS('dogma', 'foo', 'bar')).toBe(undefined)
          expect(instance._namespaceAttributes.dogma.foo).toBe('bar')
        })

        it('should throw when adding a symbol attribute', () => {
          expect(() => {
            instance.setAttributeNS('dogma', Symbol('foo'), 'bar')
          }).toThrow(TypeError)
        })

        it('should add undefined attribute when not already present', () => {
          expect(instance.setAttributeNS('dogma', undefined, 'bar')).toBe(
            undefined,
          )
          expect(instance._namespaceAttributes.dogma.undefined).toBe('bar')
        })

        it('should update undefined attribute when already present', () => {
          instance._namespaceAttributes.dogma.undefined = 'bar'
          expect(instance.setAttributeNS('dogma', undefined, 'bar')).toBe(
            undefined,
          )
          expect(instance._namespaceAttributes.dogma.undefined).toBe('bar')
        })
      })
    })
  })
}
