import * as R from 'ramda'

// eslint-disable-next-line
import { yellow, green } from 'logger'

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
    type: 'String' // TODO: should this be ObjectID?
  },
  acctId: {
    name: 'acctId',
    type: 'String'
  },
  amount: { // field for export only
    name: 'amount',
    type: 'Number'
  },
  date: {
    name: 'date',
    type: 'Date'
  },
  description: {
    name: 'description',
    type: 'String'
  },
  origDescription: {
    name: 'origDescription',
    type: 'String'
  },
  credit: {
    name: 'credit',
    type: 'Number'
  },
  debit: {
    name: 'debit',
    type: 'Number'
  },
  category1: {
    name: 'category1',
    type: 'String'
  },
  category2: {
    name: 'category2',
    type: 'String'
  },
  checkNumber: {
    name: 'checkNumber',
    type: 'String'
  },
  type: {
    name: 'type',
    type: 'String'
  },
  omit: {
    name: 'omit',
    type: 'Boolean'
  },
  ruleIds: {
    name: 'ruleIds',
    type: 'Array'
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
    type: 'String'
  },
  contains: {
    name: 'contains',
    type: 'String'
  },
  doesNotContain: {
    name: 'doesNotContain',
    type: 'String'
  },
  equals: {
    name: 'equals',
    type: 'String'
  },
  regex: {
    name: 'regex',
    type: 'String'
  }
  // in: 'in'
}

export const actionFields = {
  field: {
    name: 'field',
    type: 'String'
  },
  findValue: {
    name: 'findValue',
    type: 'Any'
  },
  numAdditionalChars: {
    name: 'numAdditionalChars',
    type: 'Number'
  },
  replaceWithValue: {
    name: 'replaceWithValue',
    type: 'Any'
  },
  category1: {
    name: 'category1',
    type: 'String'
  },
  category2: {
    name: 'category2',
    type: 'String'
  }
}

const allFields = R.mergeAll([dataFields, actionFields, operators])

// export const convertFieldData = (field, value) => {
//   yellow('field', field)
//   yellow('value', value)
//   const type = R.path([field, 'type'], dataFields)
//   yellow('type', type)
//   switch (type) {
//     case 'String':
//       return value
//     case 'Number':
//       return Number(value)
//     case 'Boolean':
//       return type(value) === 'Boolean' ? value : value === 'true'
//     default:
//       throw new Error('db.constants.convertFieldData: unknown field type.')
//   }
// }

const stringToBoolean = (value) => {
  if (R.type(value) === 'Boolean') {
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
  yellow('field', field)
  yellow('value', value)
  // yellow('type test', allFields._id)
  const type = R.path([field, 'type'], allFields)
  yellow('type', type)
  switch (type) {
    case 'String':
      return [field, value]
    case 'Number':
      return [field, Number(value)]
    case 'Boolean':
      return [field, stringToBoolean(value)]
    case 'Array':
      return [field, value]
    case 'Any':
      return [field, value]
    case 'Date':
      return [field, value]
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

const convertValues = R.pipe(
  R.tap(_log('initial')),
  R.toPairs,
  R.tap(_log('pairs')),
  R.map(convertValue),

  R.fromPairs
)

export const convertFieldValues = (fields) => {
  yellow('fields', fields)
  return R.map(convertValues, fields)
}

export const convertCriteriaValues = (fields) => {
  // receive
  const ex_fields = [
    {
      _id: '1234',
      field: 'description',
      operation: 'beginsWith',
      value: 'CHASE CREDIT CRD AUTOPAY'
    },
    {
      _id: '1234',
      field: 'credit',
      operation: 'equals',
      value: '240'
    }
  ]

  // extract field & value
  R.map(
    convertValue,
    R.map((c) => {
      const { field, value } = c
      return { field: field, value: value }
    })
  )

  // send to convertValue
}






const to_convert = [
  {
    field: 'description',
    value: 'CHASE CREDIT CRD AUTOPAY'
  },
  {
    field: 'credit',
    value: '240'
  }
]

