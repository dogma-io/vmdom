/**
 * @format
 */

export const PROPERTIES = [
  'onabort',
  'onblur',
  'onerror',
  'onfocus',
  'oncancel',
  'oncanplay',
  'oncanplaythrough',
  'onchange',
  'onclick',
  'onclose',
  'oncontextmenu',
  'oncuechange',
  'ondblclick',
  'ondrag',
  'ondragend',
  'ondragenter',
  'ondragexit',
  'ondragleave',
  'ondraover',
  'ondragstart',
  'ondrop',
  'ondurationchange',
  'onemptied',
  'onended',
  'oninput',
  'oninvalid',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onload',
  'onloadeddata',
  'onloadedmetadata',
  'onloadend',
  'onloadstart',
  'onmousedown',
  'onmouseenter',
  'onmouseleave',
  'onmousemove',
  'onmouseout',
  'onmouseover',
  'onmouseup',
  'onmousewheel',
  'onwheel',
  'onpause',
  'onplay',
  'onplaying',
  'onpointerdown',
  'onpointermove',
  'onpointerup',
  'onpointercancel',
  'onpointerover',
  'onpointerout',
  'onpointerenter',
  'onpointerleave',
  'onprogress',
  'onratechange',
  'onreset',
  'onscroll',
  'onseeked',
  'onseeking',
  'onselect',
  'onselectstart',
  'onselectionchange',
  'onshow',
  'onstalled',
  'onsubmit',
  'onsuspend',
  'ontimeupdate',
  'onvolumechange',
  'ontransitioncancel',
  'ontransitionend',
  'onwaiting',
]

export function itShoulImplementGlobalEventHandlersInterface(getInstance) {
  describe('GlobalEventHandlers interface', () => {
    let instance

    beforeEach(() => {
      instance = getInstance()
    })

    PROPERTIES.forEach(property => {
      it(`should return undefined for property ${property}`, () => {
        expect(instance[property]).toBe(null)
      })

      it(`should not allow setting property ${property} to a boolean`, () => {
        expect((instance[property] = true)).toBe(true)
        expect(instance[property]).toBe(null)
      })

      it(`should allow setting property ${property} to a function`, () => {
        const fn = () => {}
        expect((instance[property] = fn)).toBe(fn)
        expect(instance[property]).toBe(fn)
      })

      it(`should not allow setting property ${property} to a number`, () => {
        expect((instance[property] = 1)).toBe(1)
        expect(instance[property]).toBe(null)
      })

      it(`should not allow setting property ${property} to a string`, () => {
        expect((instance[property] = 'foo')).toBe('foo')
        expect(instance[property]).toBe(null)
      })

      it(`should not allow setting property ${property} to a symbol`, () => {
        const symbol = Symbol('foo')
        expect((instance[property] = symbol)).toBe(symbol)
        expect(instance[property]).toBe(null)
      })

      describe(`when property ${property} is a function`, () => {
        beforeEach(() => {
          instance[property] = () => {}
        })

        it('should allow setting it to null', () => {
          expect((instance[property] = null)).toBe(null)
          expect(instance[property]).toBe(null)
        })
      })
    })
  })
}
