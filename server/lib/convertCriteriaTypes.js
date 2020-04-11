import { mergeRight } from 'ramda'

const convertCriteriaTypes = criteria => {
  return criteria.map(c => {
    const { field, value } = c
    if (field === 'credit') {
      if (['credit', 'debit', 'numAdditionalChars'].includes(field)) {
        return mergeRight(c, { value: Number(value) })
      }
    }
    return c
  })
}

export default convertCriteriaTypes
