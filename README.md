# vmdom [![NPM][npm-img]][npm-url] [![Coverage][cov-img]][cov-url]

Lightweight browser implementation for Node's VM.

## Installation

**npm**

```bash
npm install vmdom
```

**yarn**

```bash
yarn add vmdom
```


## Usage

```js
import {Browser} from 'vmdom'

const browser = new Browser()
const {eval, window} = browser

// Execute arbitrary JavaScript using eval
eval("window.foo = 'bar'")

console.log(window.foo) // logs "bar" to console

// When you are done make sure all timers, event handlers, etc are cleaned up
Browser.destroy(browser)
```

[cov-img]: https://img.shields.io/codecov/c/github/dogma-io/vmdom.svg "Code Coverage"
[cov-url]: https://codecov.io/gh/dogma-io/vmdom

[npm-img]: https://img.shields.io/npm/v/vmdom.svg "NPM Version"
[npm-url]: https://www.npmjs.com/package/vmdom
