import wrap from 'routes/wrap'
import { actionTypes, RULES_COLLECTION_NAME, dataFields } from 'db/constants'
import { find } from 'db/dbFunctions'
import * as R from 'ramda'

// eslint-disable-next-line
import { red, green, yellow, logRequest, _log } from 'logger'

const rule = {
  _id: '5e769d5a0f17180a48b12524',
  criteria: [
    {
      _id: '5e769d5a0f17180a48b12521',
      field: 'description',
      operation: 'contains',
      value: 'CHEVRON'
    }
  ],
  actions: [
    {
      // _id: '5e769d5a0f17180a48b12522',
      action: 'zz.replaceAll',
      field: 'description',
      findValue: '',
      numAdditionalChars: '',
      replaceWithValue: 'CHEVRON',
      category1: '',
      category2: ''
    },
    {
      // _id: '5e769d5a0f17180a48b12523',
      action: 'categorize',
      field: '',
      findValue: '',
      numAdditionalChars: '',
      replaceWithValue: '',
      category1: 'auto',
      category2: 'gasoline'
    }
  ]
}

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
  pass: R.type(value) === rTypes.object,
  message: makeMessage(value, key, 'number')
})

const isNumber = (value, key) => {
  const pass = R.type(value) === 'Number'
  return {
    pass,
    message: pass ? '' : makeMessage(value, key, 'number')
  }
}

const isBoolean = (value, key) => ({
  pass: R.type(value) === rTypes.boolean,
  message: makeMessage(value, key, 'boolean')
})

const isString = (value, key) => {
  const pass = R.type(value) === 'String'
  return {
    pass,
    message: pass ? '' : makeMessage(value, key, 'string')
  }
}

const isNull = (value, key) => ({
  pass: R.type(value) === rTypes.null,
  message: makeMessage(value, key, 'null')
})

const isArray = (value, key) => {
  const pass = R.type(value) === rTypes.array
  return {
    pass,
    message: pass ? '' : makeMessage(value, key, 'array')
  }
}

const isRegExp = (value, key) => ({
  pass: R.type(value) === rTypes.regExp,
  message: makeMessage(value, key, 'RegExp')
})

const isFunction = (value, key) => ({
  pass: R.type(value) === rTypes.function,
  message: makeMessage(value, key, 'function')
})
const isUndefined = (value, key) => ({
  pass: R.type(value) === rTypes.undefined,
  message: makeMessage(value, key, 'undefined')
})

const isAction = (value, key) => {
  green('value', value)
  const pass = R.includes(value, actionTypes)
  return {
    pass,
    message: pass ? '' : `Value '${value}' is not a valid action.`
  }
}

const criteriaFieldValues = [
  dataFields.description.name,
  dataFields.type.name,
  dataFields.credit.name,
  dataFields.debit.name,
  dataFields.acctId.name,
  dataFields.date.name
]

const actionSpec = {
  // _id: '5e769d5a0f17180a48b12524',
  actions: [(value, key) => isArray(value, key), (value) => isAction(value)],
  action: [(value, key) => isString(value, key)],
  field: [(value, key) => isString(value, key)],
  findValue: [(value, key) => isString(value, key)],
  numAdditionalChars: [(value, key) => isNumber(value, key)],
  replaceWithValue: [(value, key) => isString(value, key)],
  category1: [(value, key) => isString(value, key)],
  category2: [(value, key) => isString(value, key)]
}

const actionsCheck = (value, key, obj) => {
  yellow('value', value)
  yellow('key', key)
  // yellow('obj', obj)
  // yellow('actionSpec', actionSpec)
  // good: const r = actionSpec[key][0](value, key)
  // green('actionSpec[key]', actionSpec[key])
  const r = actionSpec[key].map((fn) => fn(value, key))
  // green('r', r)
  // const { pass, message } = r[0]
  // const z = {
  //   field: key,
  //   value: value,
  //   errors: []
  // }
  // return pass ? obj : R.mergeRight(obj, { errorMsg: message })
  const ret = {
    field: key,
    value: value,
    errors: r
  }
  green('ret', ret)
  return ret
}

const pipeIt = R.pipe(
  R.tap(_log('initial')),
  R.mapObjIndexed(actionsCheck),
  R.tap(_log('after map')),

  // R.filter(R.has('errorMsg'))
  R.cond([
    [R.length(R.prop('errors')) > 0, R.identity]

  ])

  // R.tap(_log('after filter'))
)

const rulesCheckFull = wrap(async (req, res) => {
  const b = R.map(pipeIt, rule.actions)
  res.send({ result: b })
})

export default rulesCheckFull

/*

const person = {
  name: 'joe',
  age: 'hi'
}

const personSpec = {
  name: (value, key) => isString(value, key),
  age: (value, key) => isNumber(value, key)
}

const personCheck = (value, key, obj) => {
  const r = personSpec[key](value, key)
  // yellow('r', r)
  const { pass, message } = r
  return pass ? obj : R.mergeRight(obj, { errorMsg: message })
}

const res = [
  { pass: true, message: 'good' },
  { pass: true, message: 'good' },
  { pass: false, message: '!good' },
  { pass: false, message: '!good' }
]

const t = R.pipe(R.reject(R.prop('pass')), R.map(R.prop('message')))(res)
// yellow('t', t)

*/
