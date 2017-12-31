/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableSectionElement
 */

import DOMException from './DOMException'
import HTMLCollection from './HTMLCollection'
import HTMLElement from './HTMLElement'
import HTMLTableRowElement from './HTMLTableRowElement'

type HTMLTableSectionElementOptions = {|
  tagName: 'tbody' | 'tfoot' | 'thead',
|}

export default class HTMLTableSectionElement extends HTMLElement {
  _rows: Array<HTMLTableRowElement>
  rows: HTMLCollection

  constructor({tagName}: HTMLTableSectionElementOptions) {
    super({tagName})

    const rows: Array<HTMLTableRowElement> = []

    Object.defineProperties(this, {
      _rows: {
        enumerable: false,
        value: rows,
        writable: false,
      },
      rows: {
        enumerable: false,
        value: new HTMLCollection(rows),
        writable: false,
      },
    })
  }

  deleteRow(position: number) {
    if (position === undefined) {
      throw new TypeError(
        "Failed to execute 'deleteRow' on 'HTMLTableSectionElement': 1 argument required, but only 0 present.",
      )
    }

    const index = isNaN(position) ? -1 : parseInt(position)
    const max = this._rows.length - 1

    if (index < -1 || index > max || this._rows.length === 0) {
      throw new DOMException(
        `Failed to execute 'deleteRow' on 'HTMLTableSectionElement': The provided index ${
          index
        } is outside the range [-1, ${max}].`,
      )
    }

    this._rows.splice(index, 1).forEach(node => {
      this.removeChild(node)
    })
  }

  insertRow(position?: number) {
    const index = isNaN(position) ? -1 : parseInt(position)

    if (index < -1 || index > Math.max(0, this._rows.length)) {
      throw new DOMException(
        `Failed to execute 'insertRow' on 'HTMLTableSectionElement': The provided index ${
          index
        } is outside the range [-1, ${Math.max(0, this._rows.length - 1)}].`,
      )
    }

    const newRow = new HTMLTableRowElement()
    const nextRow = this._rows[index]

    if (index === -1) {
      this._rows.push(newRow)
    } else {
      this._rows.splice(index, 0, newRow)
    }

    if (nextRow) {
      this.insertBefore(newRow, nextRow)
    } else {
      this.appendChild(newRow)
    }

    return newRow
  }
}
