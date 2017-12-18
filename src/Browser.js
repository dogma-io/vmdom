/**
 * @format
 * @flow
 */

import Window from './Window'
import {createContext, runInContext, Script} from 'vm'

export default class Browser {
  _sandbox: vm$Context
  window: Window

  constructor() {
    const window = new Window()

    // $FlowFixMe - Flow doesn't like the casting type here
    const sandbox: vm$Context = {window}

    createContext(sandbox)

    Object.defineProperty(this, '_sandbox', {
      enumerable: false,
      value: sandbox,
      writable: false,
    })

    Object.defineProperty(this, 'window', {
      enumerable: false,
      value: window,
      writable: false,
    })
  }

  eval(script: string | vm$Script) {
    // TODO: figure out how to get return value of script and return it
    // (wrap script in IIFE that captures return value?)

    if (script instanceof Script) {
      script.runInContext(this._sandbox)
    } else {
      runInContext(script, this._sandbox)
    }
  }
}
