import * as R from 'ramda'

// eslint-disable-next-line
import { yellow } from 'logger'

export const DATA_COLLECTION_NAME = 'data'
export const CATEGORIES_COLLECTION_NAME = 'categories'
export const DATA_RULE_MAP_COLLECTION_NAME = 'data-rule-map'
export const ACCOUNTS_COLLECTION_NAME = 'accounts'
export const RULES_COLLECTION_NAME = 'rules'

export const dataFields = {
  acctId: {
    name: 'acctId',
    type: 'String'
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
  }
}

export const convertFieldData = (field, value) => {
  yellow('field', field)
  yellow('value', value)
  const type = R.path([field, 'type'], dataFields)
  yellow('type', type)
  switch (type) {
    case 'String':
      return value
    case 'Number':
      return Number(value)
    case 'Boolean':
      return type(value) === 'Boolean' ? value : value === 'true'
    default:
      throw new Error('db.constants.convertFieldData: unknown field type.')
  }
}

export const actionTypes = {
  replaceAll: 'replaceAll',
  categorize: 'categorize',
  omit: 'omit',
  strip: 'strip'
}

export const operators = {
  beginsWith: 'beginsWith',
  contains: 'contains',
  doesNotContain: 'doesNotContain',
  equals: 'equals',
  regex: 'regex'
  // in: 'in'
}
