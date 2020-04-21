import wrap from 'routes/wrap'
import { find } from 'db/dbFunctions'
import { DATA_COLLECTION_NAME, duplicateStatus } from 'db/constants'


const duplicatesGet = wrap(async (req, res) => {
  const ret = await find(DATA_COLLECTION_NAME, { duplicate: true })
  res.send(ret)
})

export default duplicatesGet
