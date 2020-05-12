import wrap from 'routes/wrap'
import { actionTypes, RULES_COLLECTION_NAME, dataFields } from 'db/constants'
import { find } from 'db/dbFunctions'
import * as R from 'ramda'

// eslint-disable-next-line
import { red, green, yellow, logRequest, _log, _type } from 'logger'

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
      action: 'replaceAll',
      field: 'description',
      findValue: 0,
      numAdditionalChars: 0,
      replaceWithValue: 'CHEVRON',
      category1: '',
      category2: ''
    },
    {
      // _id: '5e769d5a0f17180a48b12523',
      action: 'categorize',
      field: '',
      findValue: '',
      numAdditionalChars: 0,
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

const makeIncorrectTypeMessage = (value, key, expectedType, fnName) =>
  `${fnName}: Value '${value}' is not valid for property '${key}'. Expected ${expectedType}`

const isObject = R.curry((value, key) =>
  R.type(value) === rTypes.object
    ? ''
    : makeIncorrectTypeMessage(value, key, 'number')
)

const isNumber = R.curry((value, key) =>
  R.type(value) === rTypes.number
    ? ''
    : makeIncorrectTypeMessage(value, key, 'number')
)

const isBoolean = R.curry((value, key) =>
  R.type(value) === rTypes.boolean
    ? ''
    : makeIncorrectTypeMessage(value, key, 'boolean')
)

const isString = R.curry((value, key) =>
  R.type(value) === rTypes.string
    ? ''
    : makeIncorrectTypeMessage(value, key, 'string', 'isString')
)

const isNull = R.curry((value, key) =>
  R.type(value) === rTypes.null
    ? ''
    : makeIncorrectTypeMessage(value, key, 'null')
)

const isArray = R.curry((value, key) =>
  R.type(value) === rTypes.array
    ? ''
    : makeIncorrectTypeMessage(value, key, 'array')
)

const isRegExp = R.curry((value, key) =>
  R.type(value) === rTypes.regExp
    ? ''
    : makeIncorrectTypeMessage(value, key, 'RegExp')
)

const isFunction = R.curry((value, key) =>
  R.type(value) === rTypes.function
    ? ''
    : makeIncorrectTypeMessage(value, key, 'function')
)

const isUndefined = R.curry((value, key) =>
  R.type(value) === rTypes.undefined
    ? ''
    : makeIncorrectTypeMessage(value, key, 'undefined')
)

const isEqualTo = R.curry((value1, value2) => {
  yellow('value1', value1)
  yellow('value2', value2)
  return R.equals(value1, value2)
    ? ''
    : `isEqualTo: Value '${value2}' must equal '${value1}'`
})

const isAction = R.curry((value) => {
  return R.includes(value, R.values(actionTypes))
    ? ''
    : `Value '${value}' is not a valid action.`
})

const isNotEmpty = value => R.curry(value => {
  return R.isEmpty(value)
    ? `isNotEmpty: Value ${value} cannot be empty`
    : ''
})

const criteriaFieldValues = [
  dataFields.description.name,
  dataFields.type.name,
  dataFields.credit.name,
  dataFields.debit.name,
  dataFields.acctId.name,
  dataFields.date.name
]

/*
"errors": [
  [
    "isEqualTo: Value 'description' must equal 'description-x'",
    "isEqualTo: Value 'description' must equal ''"
  ]
]
*/
const or = R.curry((fns, value) => {
  const orRet = fns.map((fn) => fn(value))
  return R.any(R.isEmpty, orRet) ? '' : orRet
})

const actionSpec = {
  action: [isString, isAction],
  field: [isString, or([isEqualTo('description'), isEqualTo('')])],
  findValue: [isString],
  numAdditionalChars: [isNumber],
  replaceWithValue: [isString],
  category1: [isString],
  category2: [isString]
}

const actionsCheck = (value, key, obj) => {
  const r = actionSpec[key].map((fn) => fn(value, key))
  return {
    field: key,
    value: value,
    errors: r.filter((e) => {
      return !R.isEmpty(e)
    })
  }
}

const pipeIt = R.pipe(
  // R.tap(_log('start')),

  R.mapObjIndexed(actionsCheck),
  // R.tap(_log('after map')),

  R.filter((x) => R.length(R.prop('errors')(x)) > 0)
  // R.tap(_type('after filter')),

  // R.tap(_log('end'))
)

const ruleFormSpec = {
  _id: [isString, isNotEmpty],
  criteria: [isArray, isNotEmpty],
  actions: [isArray, isNotEmpty]
}

const checkRuleForm = (rule) => {
  const { _id, actions, criteria } = rule
  const idRes = ruleFormSpec._id.map(fn => fn(_id))
  red('idRes', idRes)
  const actionsRes = ruleFormSpec.actions.map(fn => fn(actions))
  red('actionsRes', actionsRes)
  const criteriaRes = ruleFormSpec.criteria.map(fn => fn(criteria))
  red('criteriaRes', criteriaRes)
}

const rulesCheckFull = wrap(async (req, res) => {
  checkRuleForm(rule)
  const b = R.map(pipeIt, rule.actions)
  // yellow('b', b)
  res.send({ result: b })
})

export default rulesCheckFull
