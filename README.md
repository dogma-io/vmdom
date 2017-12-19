# vmdom

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
