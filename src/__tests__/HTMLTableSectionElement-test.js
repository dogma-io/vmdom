import {ELEMENT_EVENT_HANDLERS} from '../Element'
import {HTML_ELEMENT_EVENT_HANDLERS} from '../HTMLElement'
import HTMLTableRowElement from '../HTMLTableRowElement'
import HTMLTableSectionElement from '../HTMLTableSectionElement'
import {GLOBAL_EVENT_HANDLERS} from '../mixins/GlobalEventHandlers'
import {TOUCH_EVENT_HANDLERS} from '../mixins/TouchEventHandlers'
import {itShouldBeAnHTMLElement} from './HTMLElement.utils'

describe('HTMLTableSectionElement', () => {
  let instance

  beforeEach(() => {
    instance = new HTMLTableSectionElement({tagName: 'thead'})
  })

  itShouldBeAnHTMLElement(() => instance, 'thead')

  it('should have expected enumerables', () => {
    expect(instance).toHaveEnumerables(
      HTML_ELEMENT_EVENT_HANDLERS.concat(ELEMENT_EVENT_HANDLERS)
        .concat(GLOBAL_EVENT_HANDLERS)
        .concat(TOUCH_EVENT_HANDLERS),
    )
  })

  it('should not allow rows to be overwritten', () => {
    expect(() => {
      instance.rows = ['test']
    }).toThrow(TypeError)
  })

  describe('deleteRow()', () => {
    it('should not be overwritable', () => {
      expect(() => {
        instance.deleteRow = 'foo'
      }).toThrow(TypeError)
    })

    describe('when no rows present', () => {
      it('should throw when position argument missing', () => {
        expect(() => {
          instance.deleteRow()
        }).toThrow(
          /Failed to execute 'deleteRow' on 'HTMLTableSectionElement': 1 argument required, but only 0 present\./,
        )
      })

      it('should throw when index is less than -1', () => {
        expect(() => {
          instance.deleteRow(-2)
        }).toThrow(
          /Failed to execute 'deleteRow' on 'HTMLTableSectionElement': The provided index -2 is outside the range \[-1, -1]\./,
        )
      })

      it('should throw when index is row length since indices are zero based', () => {
        expect(() => {
          instance.deleteRow(0)
        }).toThrow(
          /Failed to execute 'deleteRow' on 'HTMLTableSectionElement': The provided index 0 is outside the range \[-1, -1]\./,
        )
      })

      it('should throw when index is greater than row length', () => {
        expect(() => {
          instance.deleteRow(1)
        }).toThrow(
          /Failed to execute 'deleteRow' on 'HTMLTableSectionElement': The provided index 1 is outside the range \[-1, -1]\./,
        )
      })

      it('should throw when index is not a number', () => {
        expect(() => {
          instance.deleteRow(NaN)
        }).toThrow(
          /Failed to execute 'deleteRow' on 'HTMLTableSectionElement': The provided index -1 is outside the range \[-1, -1]\./,
        )
      })
    })

    describe('when one row present', () => {
      beforeEach(() => {
        instance.insertRow()
      })

      it('should throw when position argument missing', () => {
        expect(() => {
          instance.deleteRow()
        }).toThrow(
          /Failed to execute 'deleteRow' on 'HTMLTableSectionElement': 1 argument required, but only 0 present\./,
        )
      })

      it('should throw when index is less than -1', () => {
        expect(() => {
          instance.deleteRow(-2)
        }).toThrow(
          /Failed to execute 'deleteRow' on 'HTMLTableSectionElement': The provided index -2 is outside the range \[-1, 0]\./,
        )
      })

      it('should throw when index is row length since indices are zero based', () => {
        expect(() => {
          instance.deleteRow(1)
        }).toThrow(
          /Failed to execute 'deleteRow' on 'HTMLTableSectionElement': The provided index 1 is outside the range \[-1, 0]\./,
        )
      })

      it('should throw when index is greater than row length', () => {
        expect(() => {
          instance.deleteRow(2)
        }).toThrow(
          /Failed to execute 'deleteRow' on 'HTMLTableSectionElement': The provided index 2 is outside the range \[-1, 0]\./,
        )
      })

      it('should delete row when index is 0', () => {
        instance.deleteRow(0)
        expect(instance.rows).toHaveLength(0)
        expect(instance.childNodes).toHaveLength(0)
      })

      it('should delete row when index is -1', () => {
        instance.deleteRow(-1)
        expect(instance.rows).toHaveLength(0)
        expect(instance.childNodes).toHaveLength(0)
      })

      it('should delete row when index is not a number', () => {
        instance.deleteRow(NaN)
        expect(instance.rows).toHaveLength(0)
        expect(instance.childNodes).toHaveLength(0)
      })
    })

    describe('when multiple rows present', () => {
      let firstRow, lastRow

      beforeEach(() => {
        instance.insertRow()
        instance.insertRow()
        firstRow = instance.rows[0]
        lastRow = instance.rows[1]
      })

      it('should throw when position argument missing', () => {
        expect(() => {
          instance.deleteRow()
        }).toThrow(
          /Failed to execute 'deleteRow' on 'HTMLTableSectionElement': 1 argument required, but only 0 present\./,
        )
      })

      it('should throw when index is less than -1', () => {
        expect(() => {
          instance.deleteRow(-2)
        }).toThrow(
          /Failed to execute 'deleteRow' on 'HTMLTableSectionElement': The provided index -2 is outside the range \[-1, 1]\./,
        )
      })

      it('should throw when index is row length since indices are zero based', () => {
        expect(() => {
          instance.deleteRow(2)
        }).toThrow(
          /Failed to execute 'deleteRow' on 'HTMLTableSectionElement': The provided index 2 is outside the range \[-1, 1]\./,
        )
      })

      it('should throw when index is greater than row length', () => {
        expect(() => {
          instance.deleteRow(3)
        }).toThrow(
          /Failed to execute 'deleteRow' on 'HTMLTableSectionElement': The provided index 3 is outside the range \[-1, 1]\./,
        )
      })

      it('should delete first row when index is 0', () => {
        instance.deleteRow(0)
        expect(instance.rows).toHaveLength(1)
        expect(instance.rows[0]).toBe(lastRow)
        expect(instance.childNodes).toHaveLength(1)
        expect(instance.childNodes[0]).toBe(lastRow)
      })

      it('should delete last row when index is 1', () => {
        instance.deleteRow(1)
        expect(instance.rows).toHaveLength(1)
        expect(instance.rows[0]).toBe(firstRow)
        expect(instance.childNodes).toHaveLength(1)
        expect(instance.childNodes[0]).toBe(firstRow)
      })

      it('should delete last row when index is -1', () => {
        instance.deleteRow(-1)
        expect(instance.rows).toHaveLength(1)
        expect(instance.rows[0]).toBe(firstRow)
        expect(instance.childNodes).toHaveLength(1)
        expect(instance.childNodes[0]).toBe(firstRow)
      })

      it('should delete last row when index is not a number', () => {
        instance.deleteRow(NaN)
        expect(instance.rows).toHaveLength(1)
        expect(instance.rows[0]).toBe(firstRow)
        expect(instance.childNodes).toHaveLength(1)
        expect(instance.childNodes[0]).toBe(firstRow)
      })
    })
  })

  describe('insertRow()', () => {
    it('should not be overwritable', () => {
      expect(() => {
        instance.insertRow = 'foo'
      }).toThrow(TypeError)
    })

    describe('when no rows present', () => {
      it('should throw when index is less than -1', () => {
        expect(() => {
          instance.insertRow(-2)
        }).toThrow(
          /Failed to execute 'insertRow' on 'HTMLTableSectionElement': The provided index -2 is outside the range \[-1, 0]\./,
        )
      })

      it('should throw when index is greater than row length', () => {
        expect(() => {
          instance.insertRow(1)
        }).toThrow(
          /Failed to execute 'insertRow' on 'HTMLTableSectionElement': The provided index 1 is outside the range \[-1, 0]\./,
        )
      })

      it('should insert row when index is -1', () => {
        const newRow = instance.insertRow(-1)
        expect(newRow).toBeInstanceOf(HTMLTableRowElement)
        expect(instance.rows).toHaveLength(1)
        expect(instance.rows[0]).toBe(newRow)
        expect(instance.childNodes).toHaveLength(1)
        expect(instance.childNodes[0]).toBe(newRow)
      })

      it('should insert row when index is 0', () => {
        const newRow = instance.insertRow(0)
        expect(newRow).toBeInstanceOf(HTMLTableRowElement)
        expect(instance.rows).toHaveLength(1)
        expect(instance.rows[0]).toBe(newRow)
        expect(instance.childNodes).toHaveLength(1)
        expect(instance.childNodes[0]).toBe(newRow)
      })

      it('should insert row when index is omitted', () => {
        const newRow = instance.insertRow()
        expect(newRow).toBeInstanceOf(HTMLTableRowElement)
        expect(instance.rows).toHaveLength(1)
        expect(instance.rows[0]).toBe(newRow)
        expect(instance.childNodes).toHaveLength(1)
        expect(instance.childNodes[0]).toBe(newRow)
      })

      it('should insert row when index is not a number', () => {
        const newRow = instance.insertRow(NaN)
        expect(newRow).toBeInstanceOf(HTMLTableRowElement)
        expect(instance.rows).toHaveLength(1)
        expect(instance.rows[0]).toBe(newRow)
        expect(instance.childNodes).toHaveLength(1)
        expect(instance.childNodes[0]).toBe(newRow)
      })
    })

    describe('when one row present', () => {
      let firstRow

      beforeEach(() => {
        firstRow = instance.insertRow()
      })

      it('should throw when index is less than -1', () => {
        expect(() => {
          instance.insertRow(-2)
        }).toThrow(
          /Failed to execute 'insertRow' on 'HTMLTableSectionElement': The provided index -2 is outside the range \[-1, 0]\./,
        )
      })

      it('should throw when index is greater than row length', () => {
        expect(() => {
          instance.insertRow(2)
        }).toThrow(
          /Failed to execute 'insertRow' on 'HTMLTableSectionElement': The provided index 2 is outside the range \[-1, 0]\./,
        )
      })

      it('should insert row when index is -1', () => {
        const newRow = instance.insertRow(-1)
        expect(instance.rows).toHaveLength(2)
        expect(instance.rows[0]).toBe(firstRow)
        expect(instance.rows[1]).toBe(newRow)
        expect(instance.childNodes).toHaveLength(2)
        expect(instance.childNodes[0]).toBe(firstRow)
        expect(instance.childNodes[1]).toBe(newRow)
      })

      it('should insert row when index is 0', () => {
        const newRow = instance.insertRow(0)
        expect(instance.rows).toHaveLength(2)
        expect(instance.rows[0]).toBe(newRow)
        expect(instance.rows[1]).toBe(firstRow)
        expect(instance.childNodes).toHaveLength(2)
        expect(instance.childNodes[0]).toBe(newRow)
        expect(instance.childNodes[1]).toBe(firstRow)
      })

      it('should insert row when index is 1', () => {
        const newRow = instance.insertRow(1)
        expect(instance.rows).toHaveLength(2)
        expect(instance.rows[0]).toBe(firstRow)
        expect(instance.rows[1]).toBe(newRow)
        expect(instance.childNodes).toHaveLength(2)
        expect(instance.childNodes[0]).toBe(firstRow)
        expect(instance.childNodes[1]).toBe(newRow)
      })

      it('should insert row when index is omitted', () => {
        const newRow = instance.insertRow()
        expect(instance.rows).toHaveLength(2)
        expect(instance.rows[0]).toBe(firstRow)
        expect(instance.rows[1]).toBe(newRow)
        expect(instance.childNodes).toHaveLength(2)
        expect(instance.childNodes[0]).toBe(firstRow)
        expect(instance.childNodes[1]).toBe(newRow)
      })

      it('should insert row when index is not a number', () => {
        const newRow = instance.insertRow(NaN)
        expect(newRow).toBeInstanceOf(HTMLTableRowElement)
        expect(instance.rows).toHaveLength(2)
        expect(instance.rows[0]).toBe(firstRow)
        expect(instance.rows[1]).toBe(newRow)
        expect(instance.childNodes).toHaveLength(2)
        expect(instance.childNodes[0]).toBe(firstRow)
        expect(instance.childNodes[1]).toBe(newRow)
      })
    })

    describe('when multiple rows present', () => {
      let firstRow, secondRow

      beforeEach(() => {
        firstRow = instance.insertRow()
        secondRow = instance.insertRow()
      })

      it('should throw when index is less than -1', () => {
        expect(() => {
          instance.insertRow(-2)
        }).toThrow(
          /Failed to execute 'insertRow' on 'HTMLTableSectionElement': The provided index -2 is outside the range \[-1, 1]\./,
        )
      })

      it('should throw when index is greater than row length', () => {
        expect(() => {
          instance.insertRow(3)
        }).toThrow(
          /Failed to execute 'insertRow' on 'HTMLTableSectionElement': The provided index 3 is outside the range \[-1, 1]\./,
        )
      })

      it('should insert row when index is -1', () => {
        const newRow = instance.insertRow(-1)
        expect(instance.rows).toHaveLength(3)
        expect(instance.rows[0]).toBe(firstRow)
        expect(instance.rows[1]).toBe(secondRow)
        expect(instance.rows[2]).toBe(newRow)
        expect(instance.childNodes).toHaveLength(3)
        expect(instance.childNodes[0]).toBe(firstRow)
        expect(instance.childNodes[1]).toBe(secondRow)
        expect(instance.childNodes[2]).toBe(newRow)
      })

      it('should insert row when index is 0', () => {
        const newRow = instance.insertRow(0)
        expect(instance.rows).toHaveLength(3)
        expect(instance.rows[0]).toBe(newRow)
        expect(instance.rows[1]).toBe(firstRow)
        expect(instance.rows[2]).toBe(secondRow)
        expect(instance.childNodes).toHaveLength(3)
        expect(instance.childNodes[0]).toBe(newRow)
        expect(instance.childNodes[1]).toBe(firstRow)
        expect(instance.childNodes[2]).toBe(secondRow)
      })

      it('should insert row when index is 1', () => {
        const newRow = instance.insertRow(1)
        expect(instance.rows).toHaveLength(3)
        expect(instance.rows[0]).toBe(firstRow)
        expect(instance.rows[1]).toBe(newRow)
        expect(instance.rows[2]).toBe(secondRow)
        expect(instance.childNodes).toHaveLength(3)
        expect(instance.childNodes[0]).toBe(firstRow)
        expect(instance.childNodes[1]).toBe(newRow)
        expect(instance.childNodes[2]).toBe(secondRow)
      })

      it('should insert row when index is 2', () => {
        const newRow = instance.insertRow(2)
        expect(instance.rows).toHaveLength(3)
        expect(instance.rows[0]).toBe(firstRow)
        expect(instance.rows[1]).toBe(secondRow)
        expect(instance.rows[2]).toBe(newRow)
        expect(instance.childNodes).toHaveLength(3)
        expect(instance.childNodes[0]).toBe(firstRow)
        expect(instance.childNodes[1]).toBe(secondRow)
        expect(instance.childNodes[2]).toBe(newRow)
      })

      it('should insert row when index is omitted', () => {
        const newRow = instance.insertRow()
        expect(instance.rows).toHaveLength(3)
        expect(instance.rows[0]).toBe(firstRow)
        expect(instance.rows[1]).toBe(secondRow)
        expect(instance.rows[2]).toBe(newRow)
        expect(instance.childNodes).toHaveLength(3)
        expect(instance.childNodes[0]).toBe(firstRow)
        expect(instance.childNodes[1]).toBe(secondRow)
        expect(instance.childNodes[2]).toBe(newRow)
      })

      it('should insert row when index is not a number', () => {
        const newRow = instance.insertRow(NaN)
        expect(instance.rows).toHaveLength(3)
        expect(instance.rows[0]).toBe(firstRow)
        expect(instance.rows[1]).toBe(secondRow)
        expect(instance.rows[2]).toBe(newRow)
        expect(instance.childNodes).toHaveLength(3)
        expect(instance.childNodes[0]).toBe(firstRow)
        expect(instance.childNodes[1]).toBe(secondRow)
        expect(instance.childNodes[2]).toBe(newRow)
      })
    })
  })
})
