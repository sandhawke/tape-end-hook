'use strict'

const debug = require('debug')('tape_end_hook')

// patch t.end to call func first, and wait for it to resolve it's async
function atEnd (t, func) {
  const realEnd = t.end.bind(t)
  t.end = function () {
    debug('calling atEnd hook %o', func.toString())
    const result = func()
    if (result && result.then) {
      result.then(() => {
        debug('resolved; proceeding with t.end()')
        realEnd()
      })
    } else {
      debug('returned non-Promise; proceeding with t.end()')
      realEnd()
    }
  }
}

module.exports = atEnd
