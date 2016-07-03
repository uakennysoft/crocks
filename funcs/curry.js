const helpers = require('../internal/helpers')

const isFunction  = helpers.isFunction
const argsArray   = helpers.argsArray

function applyCurry(fn, arg) {
  if(!isFunction(fn)) { return fn }
  return fn.length > 1 ? fn.bind(null, arg) : fn.call(null, arg)
}

function curry(fn) {
  if(!isFunction(fn)) {
    throw TypeError('curry must receive one function')
  }

  return function() {
    const args = argsArray(arguments)

    if(args.length < fn.length) {
      return curry(Function.bind.apply(fn, [null].concat(args)))
    }

    const val = (args.length === fn.length)
      ? fn.apply(null, args)
      : args.reduce(applyCurry, fn)

    if(isFunction(val)) { return curry(val) }

    return val
  }
}

module.exports = curry
