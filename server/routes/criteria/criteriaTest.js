import wrap from 'routes/wrap'
import { find } from 'db'
import { DATA_COLLECTION_NAME } from 'db/constants'
import { filterBuilder } from 'actions/filterBuilder'
import { mergeRight } from 'ramda'

// eslint-disable-next-line
import { redf, green, logRequest } from 'logger'

const criteriaTest = wrap(async (req, res) => {
  green('criteriaTest -----------------')
  try {
    const { body } = req
    // body is an array
    green('criteriaTest: body', body)

    if (body.length < 1) {
      redf('criteriaTest', 'body.length is 0')
    }

    // All values come in as stings and most field values
    // for a criteria are strings with the exception of
    // credit, debit & numAdditionalChars which need to
    // be converted to Number

    const convertedCriteria = body.map(c => {
      const { field, value } = c
      if (field === 'credit') {
        if (['credit', 'debit', 'numAdditionalChars'].includes(field)) {
          return mergeRight(c, { value: Number(value) })
        }
      }
      return c
    })

    green('convertedCriteria', convertedCriteria)

    const filter = filterBuilder(convertedCriteria)
    green('criteriaTest: filter', filter)
    const data = await find(DATA_COLLECTION_NAME, filter)
    const descriptionsOnly = data.map(doc => doc.origDescription)
    // green('descriptionsOnly', descriptionsOnly)
    res.send(descriptionsOnly)
  } catch (e) {
    redf('criteriaTest ERROR', e.message)
    console.log(e)
  }
})

export default criteriaTest
