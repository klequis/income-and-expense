import wrap from 'routes/wrap'
import * as R from 'ramda'

// eslint-disable-next-line
import { red, green, yellow, logRequest, _log } from 'logger'

const makeMessage = (value, key, expectedType) =>
  `Value '${value}' is not valid for property '${key}'. Expected ${expectedType}`

const isNumber = (value, key) => ({
  result: R.type(value) === 'Number',
  message: makeMessage(value, key, 'number')
})
const isString = (value, key) => ({
  result: R.type(value) === 'String',
  message: makeMessage(value, key, 'string')
})

const person = {
  name: 3,
  age: 'hi'
}

const personSpec = {
  name: (value, key) => isString(value, key),
  age: (value, key) => isNumber(value, key)
}

const personCheck = (value, key, obj) => {
  const r = personSpec[key](value, key)
  return r.result ? obj : R.mergeRight(obj, { errorMsg: r.message })
}

const rulesCheck = wrap(async (req, res) => {
  const r = R.mapObjIndexed(personCheck, person)
  res.send({ result: r })
})

export default rulesCheck
