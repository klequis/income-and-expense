import wrap from 'routes/wrap'
import { actionTypes, RULES_COLLECTION_NAME, dataFields } from 'db/constants'
import { find } from 'db/dbFunctions'
import * as R from 'ramda'

// eslint-disable-next-line
import { red, green, yellow, logRequest, _log, _type } from 'logger'

const composeItWith = wrap(async (req, res) => {

  const composeIfNotNil = R.composeWith(
    (f, obj) => R.isNil(obj) ? obj : f(obj)
  )

  const a = composeIfNotNil(
    [R.inc, R.prop('age')]
  )({ age: 1 }) // => 2
  const b = composeIfNotNil([R.inc, R.prop('age')])({}) //=> undefined
  yellow('b', typeof b)
  res.send({ result: { a, b } })
})

export default composeItWith
