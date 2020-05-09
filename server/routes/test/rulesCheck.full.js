import wrap from 'routes/wrap'
import { RULES_COLLECTION_NAME, dataFields } from 'db/constants'
import { find } from 'db/dbFunctions'
import * as R from 'ramda'

// eslint-disable-next-line
import { red, green, yellow, logRequest, _log } from 'logger'

const rTypes = {
  object: 'Object',
  number: 'Number',
  boolean: 'Boolean',
  string: 'String',
  null: 'Null',
  array: 'Array',
  regExp: 'RebExp',
  function: 'Function',
  undefined: 'Unfefined'
}

const makeMessage = (value, key, expectedType) =>
  `Value '${value}' is not valid for property '${key}'. Expected ${expectedType}`

const isObject = (value, key) => ({
  result: R.type(value) === rTypes.object,
  message: makeMessage(value, key, 'number')
})

const isNumber = (value, key) => ({
  result: R.type(value) === 'Number',
  message: makeMessage(value, key, 'number')
})

const isBoolean = (value, key) => ({
  result: R.type(value) === rTypes.boolean,
  message: makeMessage(value, key, 'boolean')
})

const isString = (value, key) => ({
  result: R.type(value) === 'String',
  message: makeMessage(value, key, 'string')
})

const isNull = (value, key) => ({
  result: R.type(value) === rTypes.null,
  message: makeMessage(value, key, 'null')
})

const isArray = (value, key) => ({
  result: R.type(value) === rTypes.array,
  message: makeMessage(value, key, 'array')
})

const isRegExp = (value, key) => ({
  result: R.type(value) === rTypes.regExp,
  message: makeMessage(value, key, 'RegExp')
})

const isFunction = (value, key) => ({
  result: R.type(value) === rTypes.function,
  message: makeMessage(value, key, 'function')
})
const isUndefined = (value, key) => ({
  result: R.type(value) === rTypes.undefined,
  message: makeMessage(value, key, 'undefined')
})

const criteriaFieldValues = [
  dataFields.description.name,
  dataFields.type.name,
  dataFields.credit.name,
  dataFields.debit.name,
  dataFields.acctId.name,
  dataFields.date.name
]

// const checkRule = (rule) => {
//   const { _id, criteria, actions } = rule

//   let errors = {
//     _id
//   }
//   // check criteria
//   const { field, operation, value } = criteria
//   // criteria.field
//   if (!R.contains(field, criteriaFieldValues)) {
//     errors = R.mergeRight(errors, {
//       criteria: { field: field, error: `${field} is not valid.` }
//     })
//   }
//   // criteria.operation
//   if (!R.contains(operation, operationValues)) {
//     errors = R.mergeRight(errors, {
//       criteria: { field: field, error: `${field} is not valid.` }
//     })
//   }
// }

const person = {
  name: 'joe',
  age: 'hi'
}

// const personCheck = {
//   name: (value) => R.type(value) === 'String',
//   age: (value) => R.type(value) === 'Number'
// }

const personSpec = {
  name: (value, key) => isString(value, key),
  age: (value, key) => isNumber(value, key)
}

const personCheck = (value, key, obj) => {
  const r = personSpec[key](value, key)
  return r.result ? obj : R.mergeRight(obj, { errorMsg: r.message })
}

const rulesCheckFull = wrap(async (req, res) => {
  // const allRules = await find(RULES_COLLECTION_NAME, {})
  // const errors = R.map(checkRule, allRules)
  // const a = personCheck1('a', 'name')()
  // yellow('a', a)
  const b = R.mapObjIndexed(personCheck, person)
  res.send({ result: b })
})

export default rulesCheckFull

// thoughts
// - toPairs
// - use const isQueenOfSpades = R.allPass([isQueen, isSpade]);
//   - and pass it a list of configured functions
//   - NO, I would not know which one failed :(

/*
  if it were to return an array
*/

// const a = [
//   { r: true, message: 'the message 1' },
//   { r: true, message: 'the message 2' },
//   { r: false, message: 'the message 3' }
// ]

// const groupResults = R.groupBy = result => {
//   // const message = result.message
//   green('result', result)
//   green('result.r', result.r)
//   return result.r ? 'OK' : 'Error'
// }

// const b = groupResults(a)
// yellow('b', b)

const byGrade = R.groupBy((student) => {
  // console.log('student', student)
  // const score = student.score
  const result = student.result
  return result === true ? 'OK' : 'Bad'
})
// const students = [
//   { name: 'Abby', score: 84 },
//   { name: 'Eddy', score: 58 },
//   { name: 'Jack', score: 69 }
// ]

const res = [
  { result: true, message: 'good' },
  { result: true, message: 'good' },
  { result: false, message: '!good' },
  { result: false, message: '!good' }
]

const bg = byGrade(res)
// yellow('bg', bg)

const n = R.all((x) => x, [false, false])
// yellow('n', n)

const hasErrors = R.all(
  (x) => x,
  R.map((s) => s.result, res)
)
// yellow('hasErrors', hasErrors)

const p = res.filter(r => !r.result)
// yellow('p', p)
const q = p.map(x => x.message)
// yellow('q', q)

const getErrors = R.pipe(
  R.filter(x => !x.result),
  R.map(x => x.message)
)

// yellow('getErrors', getErrors(res))

// const s = R.map(getErrors, res)
// yellow('s', s)

const t = R.pipe(R.reject(R.prop('result')), R.map(R.prop('message')))(res)
yellow('t', t)


const v = R.reduce((a, b) => b.result ? a : [a, b.message], [], res)
yellow('v', v)

const u = R.reduce((a, b) => b.result ? a : a.concat(b.message), [], res);
yellow('u', u)
