import wrap from 'routes/wrap'
import { executeAggregate, find } from 'db/dbFunctions'
import { DATA_COLLECTION_NAME } from 'db/constants'
import * as R from 'ramda'

// eslint-disable-next-line
import { red, green, yellow, logRequest } from 'logger'

const _log = (label) => (message) => {
  if (label === 'start') {
    console.log()
    return green('start ----------------------- /n')
  }
  if (label === 'end') {
    return green('end -----------------------')
  }
  if (label === 'initial') {
    return yellow(label, message)
  }
  // const a = {
  //   desc: message.origDescription,
  //   credit: message.credit,
  //   debit: message.debit
  // }
  // return yellow(label, a)

  return yellow(label, message)
}

const findDuplicateTransactions = wrap(async (req, res) => {
  // QUERY
  const match1 = {
    $match: { acctId: 'sb.citi.costco-visa.2791' }
  }

  const group1 = {
    $group: {
      _id: {
        origDescription: '$origDescription',
        date: '$date',
        debit: '$debit',
        credit: '$credit'
      },
      iDs: { $addToSet: { _id: '$_id', date: '$date', origDescription: '$origDescription' } },
      count: { $sum: 1 }
    }
  }

  const q = [match1, group1]

  const ret = await executeAggregate(DATA_COLLECTION_NAME, q)
  const dups = ret.filter((doc) => doc.count > 1)

  yellow('dups', dups)

  // MATCH DUPS

  const matches = []
  for (let i = 0; i < dups.length; i++) {
    const { origDescription, debit } = dups[i]._id
    const credit = debit * -1
    const filter = {
      origDescription,
      credit
    }

    // yellow('filter', filter)

    const m = await find(DATA_COLLECTION_NAME, filter, {
      _id: 1,
      acctId: 1,
      date: 1,
      origDescription: 1,
      debit: 1,
      credit: 1,
      checkNumber: 1,
      type: 1
    })

    // yellow('m', m)

    if (m.length > 0) {
      matches.push(m)
    }
  }

  // console.log('matches', matches)

  const flattenDup = (dup) => {
    const { count, _id } = dup
    const { origDescription, date, debit, credit } = _id

    return {
      duplicate: {
        origDescription,
        date,
        debit,
        credit,
        count
      }
    }
  }

  const addPossibleMatches = (dup) => {
    const { duplicate } = dup
    // yellow('dup', dup)
    // yellow('duplicate', duplicate)
    const { origDescription } = duplicate
    yellow('origDescription', origDescription)
    const matchesForDup = matches.filter((m) => {
      yellow('m', m)
      const where = R.whereEq({ origDescription: origDescription })(m)
      // yellow('where', where)
      return where
    })
    yellow('matchesForDup', matchesForDup)

    // const matched = R.mergeRight(dup, { possibleMatches: m })
    // yellow('matched', matched)
    return []
  }

  // match/merge
  const a = R.pipe(
    // R.tap(_log('start')),
    // R.tap(_log('initial')),
    // flatten all props into property named 'dup'
    flattenDup,
    // R.tap(_log('flat')),
    // add possibleMatches
    addPossibleMatches
    // R.tap(_log('w-matches')),
    // R.tap(_log('end'))
  )

  const final = R.map(a, dups)

  res.send(dups)
})

export default findDuplicateTransactions
