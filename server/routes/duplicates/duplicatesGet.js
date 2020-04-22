import wrap from 'routes/wrap'
import { find } from 'db/dbFunctions'
import { DATA_COLLECTION_NAME } from 'db/constants'

// eslint-disable-next-line
import { redf, yellow } from 'logger'

const duplicatesGet = wrap(async (req, res) => {
  try {
    const data = await find(DATA_COLLECTION_NAME, { duplicate: true })
    res.send(data)
  } catch (e) {
    redf('duplicates/duplicatesGet', e.message)
    console.log(e)
  }
})

export default duplicatesGet
