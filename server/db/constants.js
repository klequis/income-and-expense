import * as R from 'ramda'
import dataTypes from './dataTypes'

// eslint-disable-next-line
import { yellow, green } from 'logger'

const _log = (label) => (message) => {
  // if (label === 'start') {
  //   return green('start ----------------------- /n')
  // }
  // if (label === 'end') {
  //   return green('end -----------------------')
  // }
  // if (label === 'initial') {
  //   return yellow(label, message)
  // }

  return yellow(label, message)
}

export const DATA_COLLECTION_NAME = 'data'
export const CATEGORIES_COLLECTION_NAME = 'categories'
export const DATA_RULE_MAP_COLLECTION_NAME = 'data-rule-map'
export const ACCOUNTS_COLLECTION_NAME = 'accounts'
export const RULES_COLLECTION_NAME = 'rules'

export const duplicateStatus = {
  duplicateNew: 'duplicateNew',
  duplicatePending: 'duplicatePending',
  duplicateRefunded: 'duplicateRefunded',
  duplicateNotRefunded: 'duplicateNotRefunded',
  duplicateNot: 'duplicateNot'
}

export const dataFields = {
  _id: {
    name: '_id',
    type: dataTypes.String // TODO: should this be ObjectID?
  },
  acctId: {
    name: 'acctId',
    type: dataTypes.String
  },
  amount: { // field for export only
    name: 'amount',
    type: dataTypes.Number
  },
  date: {
    name: 'date',
    type: dataTypes.Date
  },
  description: {
    name: 'description',
    type: dataTypes.String
  },
  origDescription: {
    name: 'origDescription',
    type: dataTypes.String
  },
  credit: {
    name: 'credit',
    type: dataTypes.Number
  },
  debit: {
    name: 'debit',
    type: dataTypes.Number
  },
  category1: {
    name: 'category1',
    type: dataTypes.String
  },
  category2: {
    name: 'category2',
    type: dataTypes.String
  },
  checkNumber: {
    name: 'checkNumber',
    type: dataTypes.String
  },
  type: {
    name: 'type',
    type: dataTypes.String
  },
  omit: {
    name: 'omit',
    type: dataTypes.Boolean
  },
  ruleIds: {
    name: 'ruleIds',
    type: dataTypes.Array
  }
}

export const actionTypes = {
  replaceAll: 'replaceAll',
  categorize: 'categorize',
  omit: 'omit',
  strip: 'strip'
}

export const operators = {
  beginsWith: {
    name: 'beginsWith',
    type: dataTypes.String
  },
  contains: {
    name: 'contains',
    type: dataTypes.String
  },
  doesNotContain: {
    name: 'doesNotContain',
    type: dataTypes.String
  },
  equals: {
    name: 'equals',
    type: dataTypes.String
  },
  regex: {
    name: 'regex',
    type: dataTypes.String
  }
  // in: 'in'
}

export const actionFields = {
  field: {
    name: 'field',
    type: dataTypes.String
  },
  findValue: {
    name: 'findValue',
    type: dataTypes.Any
  },
  numAdditionalChars: {
    name: 'numAdditionalChars',
    type: dataTypes.Number
  },
  replaceWithValue: {
    name: 'replaceWithValue',
    type: dataTypes.Any
  },
  category1: {
    name: 'category1',
    type: dataTypes.String
  },
  category2: {
    name: 'category2',
    type: dataTypes.String
  }
}

const criteriaFields = {
  _id: {
    name: '_id',
    type: dataTypes.String
  },
  field: {
    name: 'field',
    type: dataTypes.String
  },
  value: {
    name: 'value',
    type: dataTypes.Any
  },
  action: {
    name: 'action',
    type: dataTypes.String
  },
  findValue: {
    name: 'findValue',
    type: dataTypes.String
  }
}

const allFields = R.mergeAll([dataFields, actionFields, operators])

const stringToBoolean = (value) => {
  if (R.type(value) === dataTypes.Boolean) {
    return value
  }

  if (value.toLowerCase() === 'true') {
    return true
  }

  if (value.toLowerCase() === 'false') {
    return false
  }
}

const convertValue = ({ field, value }) => {
  // yellow('allFields', allFields)
  // yellow('field', field)
  // yellow('value', value)
  // yellow('type test', allFields._id)
  const type = R.path([field, dataFields.type.name], allFields)
  // yellow('type', type)
  switch (type) {
    case dataTypes.String:
      return [field, value]
    case dataTypes.Number:
      return [field, Number(value)]
    case dataTypes.Boolean:
      return [field, stringToBoolean(value)]
    case dataTypes.Array:
      return [field, value]
    case dataTypes.Any:
      return [field, value]
    case dataTypes.Date:
      return [field, new Date(value).toISOString]
    default:
      throw new Error(
        `db.constants.convertFieldData: unknown field type: ${type}.`
      )
  }
}

export const convertOneFieldValue = (field, value) => {
  const a = convertValue({ field, value })
  return a[1]
}

const convertValues = R.pipe(
  R.tap(_log('initial')),
  R.toPairs,
  R.tap(_log('pairs')),
  R.map(convertValue),

  R.fromPairs
)

export const convertFieldValues = (fields) => {
  // yellow('fields', fields)
  return R.map(convertValues, fields)
}

// export const convertCriteriaValues = (fields) => {
//   // receive
//   // const ex_fields = [
//   //   {
//   //     _id: '1234',
//   //     field: 'description',
//   //     operation: 'beginsWith',
//   //     value: 'CHASE CREDIT CRD AUTOPAY'
//   //   },
//   //   {
//   //     _id: '1234',
//   //     field: 'credit',
//   //     operation: 'equals',
//   //     value: '240'
//   //   }
//   // ]

//   // extract field & value
//   R.map(
//     convertValue,
//     R.map((c) => {
//       const { field, value } = c
//       return { field: field, value: value }
//     })
//   )

//   // send to convertValue
// }