import { mergeRight } from 'ramda'
import { dataFields, actionFields } from 'db/constants'

const convertCriteriaTypes = (criteria) => {
  return criteria.map((c) => {
    const { field, value } = c
    if (field === dataFields.credit.name) {
      if (
        [
          dataFields.credit.name,
          dataFields.debit.name,
          actionFields.numAdditionalChars.name
        ].includes(field)
      ) {
        return mergeRight(c, { value: Number(value) })
      }
    }
    return c
  })
}

export default convertCriteriaTypes
