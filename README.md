# vmdom

Lightweight browser implementation for Node's VM.

## Installation

## Usage

```js
import {Browser} from 'vmdom'

const {eval, window} = new Browser()

// Execute arbitrary JavaScript using eval
eval("window.foo = 'bar'")

console.log(window.foo) // logs "bar" to console
```
