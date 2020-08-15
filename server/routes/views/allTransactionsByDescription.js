import wrap from 'routes/wrap'
import { find } from 'db'
import { TRANSACTIONS_COLLECTION_NAME, convertFieldValuesToUi } from 'db/constants'
// eslint-disable-next-line
import { yellow, redf } from 'logger'

const allDataByDescription = wrap(async (req, res) => {
  try {
    const data = await find(TRANSACTIONS_COLLECTION_NAME, {})
    res.send(convertFieldValuesToUi(data))
  } catch (e) {
    redf('views/allDataByDescription', e.message)
    console.log(e)
  }
})

export default allDataByDescription
