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

type Rows = Array<HTMLTableRowElement>

function deleteRow(rows: Rows, position: number) {
  if (position === undefined) {
    throw new TypeError(
      "Failed to execute 'deleteRow' on 'HTMLTableSectionElement': 1 argument required, but only 0 present.",
    )
  }

  const index = isNaN(position) ? -1 : parseInt(position)
  const max = rows.length - 1

  if (index < -1 || index > max || rows.length === 0) {
    throw new DOMException(
      `Failed to execute 'deleteRow' on 'HTMLTableSectionElement': The provided index ${index} is outside the range [-1, ${max}].`,
    )
  }

  rows.splice(index, 1).forEach((node: HTMLTableRowElement) => {
    this.removeChild(node)
  })
}

function insertRow(rows: Rows, position?: number): HTMLTableRowElement {
  const index = isNaN(position) ? -1 : parseInt(position)

  if (index < -1 || index > Math.max(0, rows.length)) {
    throw new DOMException(
      `Failed to execute 'insertRow' on 'HTMLTableSectionElement': The provided index ${index} is outside the range [-1, ${Math.max(
        0,
        rows.length - 1,
      )}].`,
    )
  }

  const newRow = new HTMLTableRowElement()
  const nextRow = rows[index]

  if (index === -1) {
    rows.push(newRow)
  } else {
    rows.splice(index, 0, newRow)
  }

  if (nextRow) {
    this.insertBefore(newRow, nextRow)
  } else {
    this.appendChild(newRow)
  }

  return newRow
}

export default class HTMLTableSectionElement extends HTMLElement {
  deleteRow: (position: number) => void
  insertRow: (position?: number) => HTMLTableRowElement
  rows: HTMLCollection

  constructor({tagName}: HTMLTableSectionElementOptions) {
    super({tagName})

    const rows: Rows = []

    Object.defineProperties(this, {
      deleteRow: {
        enumerable: false,
        value: deleteRow.bind(this, rows),
        writable: false,
      },
      insertRow: {
        enumerable: false,
        value: insertRow.bind(this, rows),
        writable: false,
      },
      rows: {
        enumerable: false,
        value: new HTMLCollection(rows),
        writable: false,
      },
    })
  }
}
