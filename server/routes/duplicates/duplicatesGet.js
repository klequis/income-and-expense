import wrap from 'routes/wrap'
import { find } from 'db/dbFunctions'
import { DATA_COLLECTION_NAME } from 'db/constants'

const duplicatesGet = wrap(async (req, res) => {
  try {
    const data = await find(DATA_COLLECTION_NAME, { duplicate: true })
    res.send(data)
  } catch (e) {
    redf('views/allDataByDescription', e.message)
    console.log(e)
  }
})

export default duplicatesGet
