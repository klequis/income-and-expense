import wrap from 'routes/wrap'
import { executeAggregate, find, updateMany } from 'db/dbFunctions'
import { DATA_COLLECTION_NAME, duplicateStatus } from 'db/constants'
import * as R from 'ramda'
import { ObjectID } from 'mongodb'

// eslint-disable-next-line
import { red, green, yellow, logRequest, _log } from 'logger'

const checkNewDuplicates = wrap(async (req, res) => {
  const match1 = {
    $match: {}
  }

  const group1 = {
    $group: {
      _id: {
        origDescription: '$origDescription',
        date: '$date',
        debit: '$debit',
        credit: '$credit'
      },
      count: { $sum: 1 },
      ids: {
        $addToSet: {
          _id: '$_id'
        }
      }
    }
  }

  const match2 = {
    $match: { count: { $gt: 1 } }
  }

  const project1 = {
    $project: {
      _id: false,
      count: false
    }
  }

  const q = [match1, group1, match2, project1]

  const ret = await executeAggregate(DATA_COLLECTION_NAME, q)

  // process ret

  const getIds = (obj) => obj.ids

  const appendItObj = (obj) => {
    return R.map((x) => x._id, obj)
  }

  const toArrayOfIds = R.pipe(
    R.tap(_log('initial')),
    getIds,
    R.tap(_log('getIds')),
    appendItObj,
    R.tap(_log('appendItObj', appendItObj))
  )

  const asObj = R.map(toArrayOfIds, ret)
  // yellow('asObj', asObj)

  const flat = R.flatten(asObj)
  // yellow('flat', flat)
  // yellow('type', typeof flat[0])

  // const idsToUpdate = R.map(x => new ObjectID(), flat)

  // yellow('idsToUpdate', idsToUpdate)

  const um = await updateMany(
    DATA_COLLECTION_NAME,
    { _id: { $in: flat } },
    { $set: { duplicateId: new ObjectID(), duplicateStatus: duplicateStatus.duplicateNew, duplicate: true } }
  )

  const f = await find(DATA_COLLECTION_NAME, { _id: { $in: flat } })
  yellow('WARN', 'should convert values ToUi?')
  res.send(f)
})

export default checkNewDuplicates
