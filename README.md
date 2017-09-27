Helps keeping tests more readable

Example:

```js
const test = require('tape')
const atEnd = require('tape-end-hook')

test('triple hook, some async', t => {
  t.plan(3)
  let counter = 0
  atEnd(t, () => { t.equal(++counter, 3) })
  atEnd(t, async () => { await sleep(1); t.equal(++counter, 2) })
  atEnd(t, () => { t.equal(++counter, 1) })
  t.end()
})
```
