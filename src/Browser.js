/**
 * @format
 * @flow
 */

import Window from './Window'
import {createContext} from 'vm'

export default class Browser {
  _sandbox: Window

  constructor() {
    const sandbox = new Window()

    createContext(sandbox)

    Object.defineProperty(this, '_sandbox', {
      enumerable: false,
      value: sandbox,
      writable: false,
    })
  }
}
