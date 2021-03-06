import wrap from 'routes/wrap'
import { executeAggregate, find } from 'db/dbFunctions'
import { DATA_COLLECTION_NAME, convertFieldValuesToUi } from 'db/constants'
import * as R from 'ramda'

// eslint-disable-next-line
import { redf, yellow } from 'logger'

const match1 = {
  $match: {
    duplicate: true
  }
}

const group1 = {
  $group: {
    _id: {
      acctId: '$acctId'
    },
    docs: {
      $addToSet: '$$ROOT'
    }
  }
}

const replaceId = (doc) => {
  return {
    acctId: R.path(['_id', 'acctId'])(doc),
    docs: R.path(['docs'])(doc)
  }
}

const duplicatesGet = wrap(async (req, res) => {
  try {
    const q = [match1, group1]
    const ret = await executeAggregate(DATA_COLLECTION_NAME, q)
    const y = R.map(replaceId, ret)
    res.send(convertFieldValuesToUi(y))
  } catch (e) {
    redf('duplicates/duplicatesByAccountGet', e.message)
    console.log(e)
  }
})

export default duplicatesGet
