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

const {eval, window} = new Browser()

// Execute arbitrary JavaScript using eval
eval("window.foo = 'bar'")

console.log(window.foo) // logs "bar" to console
```
