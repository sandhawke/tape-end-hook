const test = require('tape')
const atEnd = require('.')

test('single hook', t => {
  t.plan(1)
  atEnd(t, () => { t.pass() })
  t.end()
})

test('triple hook, reverse order', t => {
  t.plan(3)
  let counter = 0
  atEnd(t, () => { t.equal(++counter, 3) })
  atEnd(t, () => { t.equal(++counter, 2) })
  atEnd(t, () => { t.equal(++counter, 1) })
  t.end()
})

test('triple hook, some async', t => {
  t.plan(3)
  let counter = 0
  atEnd(t, () => { t.equal(++counter, 3) })
  atEnd(t, async () => { await sleep(1); t.equal(++counter, 2) })
  atEnd(t, () => { t.equal(++counter, 1) })
  t.end()
})

// flag to check whether the next two tests overlap somehow
let signal

test('async', t => {
  signal = 't3 starting'
  t.plan(3)
  let counter = 0
  atEnd(t, () => { signal = 't3 ending' })
  atEnd(t, async () => { await sleep(10); t.equal(++counter, 3) })
  atEnd(t, async () => { await sleep(10); t.equal(++counter, 2) })
  atEnd(t, async () => { await sleep(10); t.equal(++counter, 1) })
  t.end()
})

test('post async', t => {
  t.plan(1)
  t.equal(signal, 't3 ending')
  t.end()
})

function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
