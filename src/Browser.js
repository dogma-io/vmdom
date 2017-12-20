/**
 * @format
 * @flow
 */

/* global vm$Context, vm$Script */

import Window from './Window'
import {readFileSync} from 'fs'
import {join} from 'path'
import {createContext, runInContext, Script} from 'vm'

type BrowserOptions = {
  userAgent?: string,
}

function getVersion() {
  const path = join(__dirname, '..', 'package.json')
  const contents = readFileSync(path, 'utf8')
  const data = JSON.parse(contents)
  return data.version
}

export default class Browser {
  _sandbox: vm$Context
  global: Window
  window: Window

  constructor(options?: BrowserOptions) {
    options = options || {}

    const {userAgent} = options

    const window = new Window({
      userAgent: userAgent || `vmdom/${getVersion()}`,
    })

    // $FlowFixMe - Flow doesn't like the casting type here
    const sandbox: vm$Context = new Proxy(this, {
      get(target: Browser, property: string) {
        if (['global', 'window'].indexOf(property) !== -1) {
          return target.window
        } else {
          return target.window[property]
        }
      },
      set(target: Browser, property: string, value: any) {
        if (['global', 'window'].indexOf(property) !== -1) {
          target.window = value
        } else {
          target.window[property] = value
        }

        return true
      },
    })

    createContext(sandbox)

    Object.defineProperties(this, {
      _sandbox: {
        enumerable: false,
        value: sandbox,
        writable: false,
      },
      global: {
        enumerable: false,
        value: window,
        writable: false,
      },
      window: {
        enumerable: false,
        value: window,
        writable: false,
      },
    })
  }

  static destroy(instance: Browser) {
    Window.destroy(instance.window)
  }

  eval(script: string | vm$Script) {
    // TODO: figure out how to get return value of script and return it
    // (wrap script in IIFE that captures return value?)

    if (script instanceof Script) {
      return script.runInContext(this._sandbox)
    }

    return runInContext(script, this._sandbox)
  }
}
