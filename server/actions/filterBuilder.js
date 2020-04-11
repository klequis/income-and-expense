import { DATA_COLLECTION_NAME } from 'db/constants'

// eslint-disable-next-line
import { blue, green, greenf, redf, yellow } from 'logger'
import { operators } from '../constants'

const operationBeginsWith = (field, value) => {
  return { [field]: { $regex: `^${value}`, $options: 'im' } }
}

const operationContains = (field, value) => {
  return { [field]: { $regex: `${value}`, $options: 'im' } }
}

const operationEquals = (field, value) => {
  return { [field]: { $eq: value } }
}

const operationRegex = (field, value) => {
  return { [field]: { $regex: `${value}`, $options: 'im' } }
}

// const createRegex = (findValue, numAdditionalChars = 0) => {
//   const regExAsString =
//     numAdditionalChars > 0
//       ? `(${findValue}).{${numAdditionalChars}}`
//       : `(${findValue})`
//   return new RegExp(regExAsString)
// }

// const operationIn = (field, value) => {
//   const regex = new RegExp(value)
//   return { [field]: { $in: [regex] } }
// }

const operationDoesNotContain = (field, value) => {
  return { [field]: { $not: { $regex: value } } }
}

export const conditionBuilder = criteria => {
  // takes a single criteria object

  // TODO: hard coding descriptions  => origDescription. Where should this logic be?

  const { field: origField, operation, value } = criteria
  const field = origField === 'description' ? 'origDescription' : origField

  switch (operation) {
    case operators.beginsWith:
      return operationBeginsWith(field, value)
    case operators.contains:
      return operationContains(field, value)
    case operators.doesNotContain:
      return operationDoesNotContain(field, value)
    case operators.equals:
      return operationEquals(field, value)
    case operators.regex:
      return operationRegex(field, value)
    default:
      redf(
        'deleteAction ERROR: ',
        `operation ${operation} not covered in switch`
      )
      throw new Error(
        `conditionBuilder ERROR: unknown operation '${operation}'`
      )
  }
}

export const filterBuilder = criteria => {
  if (criteria.length === 1) {
    const o = conditionBuilder(criteria[0])
    return o
  } else {
    const b = criteria.map(c => conditionBuilder(c))
    const c = { $and: b }
    return c
  }
}

export const printResult = (id, expectRows, actualRows) => {
  expectRows === actualRows
    ? greenf(`OK: id: ${id}, expected: ${expectRows}, actual: ${actualRows}`)
    : redf(`ERROR: id: ${id}, expected: ${expectRows}, actual: ${actualRows}`)
}
