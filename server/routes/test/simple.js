import wrap from 'routes/wrap'
import { actionTypes, RULES_COLLECTION_NAME, dataFields, operators } from 'db/constants'
import { find } from 'db/dbFunctions'
import * as R from 'ramda'
import { rTypes, rule, /*isString,*/ /*isOneOf,*/ isNotEmpty } from './rulesCheck'

// eslint-disable-next-line
import { purple, red, green, yellow, logRequest, _log, _type } from 'logger'

export const isOneOf = (value, listOrObj) => {
  const compareList =
    R.type(listOrObj) === 'Object' ? R.values(listOrObj) : listOrObj

  return R.includes(value, R.values(compareList))
}

const propValueTypeIs = R.curry((type, prop, obj) =>
  R.propSatisfies((x) => R.type(x) === type.name, prop, obj)
)

const checkRuleShape = (rule) => {
  const r = R.allPass([R.has('_id'), R.has('criteria'), R.has('actions')])(rule)
  return r
}

const checkRulePropTypes = (rule) => {
  return R.allPass([
    propValueTypeIs(String, '_id'),
    propValueTypeIs(Array, 'criteria'),
    propValueTypeIs(Array, 'actions')
  ])(rule)
}

const checkCriteriaShape = (criteria) => {
  const fieldsPass = (criterion) =>
    R.allPass([R.has('field'), R.has('operation'), R.has('value')])(criterion)
  return R.all(R.equals(true))(R.map(fieldsPass, criteria))
}

const checkCriteriaPropTypes = (criteria) => {
  yellow('criteria', criteria)
  const checkCriterion = (criterion) => {
    yellow('criterion', criterion)
    if (R.prop('field')(criterion) === 'description') {
      const value = propValueTypeIs(String, 'value')(criterion)
      const operation = R.prop('operation')(criterion)
      yellow('prop(operator', operation)
      yellow('operators', operators)
      const operator = isOneOf(operation, operators)
      yellow('value', value)
      yellow('operator', operator)
      return value
    }
  }

  return R.map(checkCriterion, criteria)
}

const simple = wrap(async (req, res) => {
  const { actions, criteria } = rule
  yellow('criteria', criteria)
  const ruleShape = checkRuleShape(rule)
  const rulePropTypes = checkRulePropTypes(rule)
  const criteriaShape = checkCriteriaShape(criteria)
  const criteriaPropTypes = checkCriteriaPropTypes(criteria)

  // yellow('rulePropTypes', rulePropTypes)
  res.send({
    result: {
      ruleShape,
      rulePropTypes,
      criteriaShape,
      criteriaPropTypes
    }
  })
})

export default simple

/*

const composeItWith = wrap(async (req, res) => {
  const composeIfNotNil = R.composeWith((f, obj) =>
    R.isNil(obj) ? obj : f(obj)
  )

  const a = composeIfNotNil([R.inc, R.prop('age')])({ age: 1 }) // => 2
  const b = composeIfNotNil([R.inc, R.prop('age')])({}) //=> undefined
  yellow('b', typeof b)
  res.send({ result: { a, b } })
})

*/
