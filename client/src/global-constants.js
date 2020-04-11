import { format } from 'date-fns'

export const REQUEST_PENDING = 'REQUEST_PENDING'
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
export const REQUEST_FAILURE = 'REQUEST_FAILURE'
export const TOAST_WARN = 'TOAST_WARN'
export const TOAST_INFO = 'TOAST_INFO'

export const operators = {
  beginsWith: 'beginsWith',
  contains: 'contains',
  doesNotContain: 'doesNotContain',
  equals: 'equals',
  regex: 'regex',
  // in: 'in'
}

export const dataFieldsZZ = {
  description: 'description',
  type: 'type',
  credit: 'credit',
  debit: 'debit'
}

export const actionTypes = {
  replaceAll: 'replaceAll',
  categorize: 'categorize',
  omit: 'omit',
  strip: 'strip',
}

export const viewModes = {
  modeView: 'modeView',
  modeEdit: 'modeEdit',
  modeNew: 'modeNew'
}

export const dataFieldNames = {
  _id: '_id',
  date: 'date',
  description: 'description',
  origDescription: 'origDescription',
  credit: 'credit',
  debit: 'debit',
  category1: 'category1',
  category2: 'category2',
  checkNumber: 'checkNumber',
  type: 'type',
  omit: 'omit'
}


export const dataFields = {
  _id: {
    name: '_id',
    description: 'Id'
  },
  acctId: {
    name: 'acctId',
    description: 'AccountId'
  },
  date: {
    name: 'date',
    description: 'Date',
    formatFn: d => format(new Date(d), 'MM/dd/yyyy')
  },
  description: {
    name: 'description',
    description: 'Description'
  },
  origDescription: {
    name: 'origDescription',
    description: 'OrigDescription'
  },
  credit: {
    name: 'credit',
    description: 'Credidt'
  },
  debit: {
    name: 'debit',
    description: 'Debit'
  },
  category1: {
    name: 'category1',
    description: 'Category1'
  },
  category2: {
    name: 'category2',
    description: 'Category2'
  },
  checkNumber: {
    name: 'checkNumber',
    description: 'Check#'
  },
  ruleIds: {
    name: 'ruleIds',
    description: 'RuleIds'
  },
  taxDeduct: {
    name: 'taxDeduct',
    description: 'taxDeduct'
  },
  type: {
    name: 'type',
    description: 'Type'
  },
  omit: {
    name: 'omit',
    description: 'Omit',
    formatFn: d => d ? 'yes' : 'no'
  }
}


































export const sortDirections = {
  ascending: 'ascending',
  descending: 'descending'
}

export const views = {
  amountByCategory: 'amount-by-category',
  allDataByDescription: 'all-data-by-description',
  rawData: 'raw-data'
}