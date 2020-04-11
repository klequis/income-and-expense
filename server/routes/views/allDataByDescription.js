import wrap from 'routes/wrap'
import { find } from 'db'
import { DATA_COLLECTION_NAME } from 'db/constants'
// eslint-disable-next-line
import { yellow, redf } from 'logger'

const allDataByDescription = wrap(async (req, res) => {
  try {
    const data = await find(DATA_COLLECTION_NAME, {})
    res.send(data)
  } catch (e) {
    redf('views/allDataByDescription', e.message)
    console.log(e)
  }
})

export default allDataByDescription
