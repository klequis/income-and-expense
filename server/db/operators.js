import * as R from 'ramda'

import { redf, green, yellow, _log } from 'logger'
// const beginsWith = {
//   name: 'beginsWith',
//   type: String.name
// }
// const contains = {
//   name: 'contains',
//   type: String.name
// }
// const doesNotContain = {
//   name: 'doesNotContain',
//   type: String.name
// }
// const equals = {
//   name: 'equals',
//   type: String.name
// }

const o = {
  beginsWith: {
    name: 'beginsWith',
    type: String.name
  },
  contains: {
    name: 'contains',
    type: String.name
  },
  doesNotContain: {
    name: 'doesNotContain',
    type: String.name
  },
  equals: {
    name: 'equals',
    type: String.name
  }
}

const getPropValue = prop => obj => {
  green('prop', prop)
  green('obj', obj)
  return R.prop(prop)(obj)
}

// const names = () => {
//   const a = R.map(R.prop('name'), o)
//   yellow('a', R.values(a))
//   return a
// }

const names = R.pipe(
  R.map(R.prop('name')),
  R.tap(_log('after map')),
  R.values,
  R.tap(_log('after values'))
)(o)



const operators = {
  beginsWith: o.beginsWith,
  contains: o.contains,
  doesNotContain: o.doesNotContain,
  equals: o.equals,
  names,
  isOneOf: value => 'a'
}

export default operators
