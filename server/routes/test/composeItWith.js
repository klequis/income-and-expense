import wrap from 'routes/wrap'
import { actionTypes, RULES_COLLECTION_NAME, dataFields } from 'db/constants'
import { find } from 'db/dbFunctions'
import * as R from 'ramda'
import { rule, isString, isOneOf, isNotEmpty } from './rulesCheck'

// eslint-disable-next-line
import { purple, red, green, yellow, logRequest, _log, _type } from 'logger'

// R.propEq('hair', 'brown')

const checkObj = (value, key, obj) => {
  red('value', value)
  red('key', key)
  red('obj', obj)
  const a = R.equals(value, 'categorize')
  yellow('is categorize', a)
  R.when(
    R.equals(R.prop('action'), 'categorize'),
    R.pipe(
      R.tap(_log('pipe'))
    )
  )(obj)
}

const checkActions = R.pipe(
  R.tap(_log('start')),
  R.tap(_log('in')),
  R.mapObjIndexed(
    checkObj
    // R.when(
    //   R.propEq('action', 'categorize'),
    //   R.pipe(
    //     R.tap(_log('aaa')),
    //     R.append(R.__, isString),
    //     R.append(R.__, isNotEmpty),
    //     R.append(R.__, isOneOf(['a', 'b'])),
    //     R.tap(_log('bbb'))
    //   )
    // )
  ),
  R.tap(_log('out')),
  R.tap(_log('end'))
)

const composeItWith = wrap(async (req, res) => {
  const { actions } = rule

  const a = R.map(checkActions, actions)
  // const a = R.mapObjIndexed(checkActions, actions)

  res.send({ result: a })
})

export default composeItWith

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
