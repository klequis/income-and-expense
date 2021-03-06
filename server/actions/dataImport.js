import {
  createCollection,
  createIndex,
  dropCollection,
  find,
  insertMany
} from 'db'
import {
  ACCOUNTS_COLLECTION_NAME,
  DATA_COLLECTION_NAME,
  dataFields
} from 'db/constants'
import csv from 'csvtojson'
import R, { isNil } from 'ramda'
import runRules from './runRules'

// eslint-disable-next-line
import { green, red, redf, yellow } from 'logger'

const readCsvFile = async (file, hasHeaders) => {
  try {
    if (hasHeaders) {
      const json = await csv({
        trim: true,
        checkType: true,
        noheader: false,
        headers: []
      }).fromFile(`data/${file}`)
      return json
    } else {
      const json = await csv({
        trim: true,
        checkType: true,
        noheader: true,
        headers: []
      }).fromFile(`data/${file}`)
      return json
    }
  } catch (e) {
    redf('readCSVFile ERROR:', `File ${file} not found.`)
  }
}

const removeDoubleSpace = (value) => value.replace(/\s{2,}/g, ' ').trim()
const toIsoString = (value) => {
  // yellow('value', value)
  const newValue = new Date(value).toISOString()
  // yellow('newValue', newValue)
  return newValue
  // value.toISOString()
}

const evolver = {
  description: R.pipe(removeDoubleSpace, R.trim),
  origDescription: R.pipe(removeDoubleSpace, R.trim),
  // date: R.identity,
  date: toIsoString,
  credit: R.pipe(
    R.cond([
      [R.gt(R.__, 0), (x) => x],
      [R.T, R.always(0)]
    ])
  ),
  debit: R.pipe(
    R.cond([
      [R.lt(R.__, 0), (x) => x],
      [R.T, R.always(0)]
    ])
  )
}

const parseFieldValue = (parse, value) => {
  if (parse === '>0') {
    return value > 0 ? value : 0
  }
  if (parse === '<0') {
    return value < 0 ? value : 0
  }
  if (parse === 'reverseSign') {
    return value * -1
  }
}

const _stripDollarSign = (value) => {
  if (R.type(value) === 'String' && value.startsWith('$')) {
    return Number(value.slice(1))
  }
  return value
}

const getFieldValue = (fieldCol) => (doc) => {
  if (R.type(fieldCol) === 'Undefined') {
    return ''
  }
  const { col, parse } = fieldCol
  const value = _stripDollarSign(R.prop(`field${col}`)(doc)) || ''
  if (!isNil(parse)) {
    return parseFieldValue(parse, value)
  }
  return value
}

const _transformData = (account, data) => {
  const { fieldToCol, acctId } = account

  try {
    const mapToFields = (doc) => {
      const ret = {
        acctId,
        date: getFieldValue(R.prop(dataFields.date.name)(fieldToCol))(doc),
        description: getFieldValue(
          R.prop(dataFields.description.name)(fieldToCol)
        )(doc),
        origDescription: getFieldValue(
          R.prop(dataFields.description.name)(fieldToCol)
        )(doc),
        credit: getFieldValue(R.prop(dataFields.credit.name)(fieldToCol))(doc),
        debit: getFieldValue(R.prop(dataFields.debit.name)(fieldToCol))(doc),
        category1: 'none',
        category2: '',
        checkNumber: getFieldValue(R.prop(dataFields.checkNumber)(fieldToCol))(
          doc
        ),
        type: getFieldValue(R.prop(dataFields.type.name.name)(fieldToCol))(doc),
        omit: false
      }
      return ret
    }

    const transform = R.compose(
      // R.tap(_log('end')),
      // there is a flag in the db called swapCreditDebitCols
      // which is not being used and no routine for it has been written
      // R.tap(_log('after evolve')),
      R.evolve(evolver),
      // R.tap(_log('after map')),
      mapToFields
      // R.tap(_log('after swap')),
      // R.tap(_log('initial')),
      // R.tap(_log('start'))
    )
    return R.map(transform, data)
  } catch (e) {
    red(dataFields.acctId.name, acctId)
    red('ftc', fieldToCol)
    redf('_transformDataNew ERROR', e.message)
    console.log(e)
  }
}

const dataImport = async (loadRaw = false) => {
  try {
    let docsInserted = 0
    await dropCollection(DATA_COLLECTION_NAME)
    // await createCollection(DATA_COLLECTION_NAME, { validator: validator })
    if (loadRaw) {
      await dropCollection('data-all')
    }
    const accounts = await find(ACCOUNTS_COLLECTION_NAME, {
      active: { $ne: false }
    })

    for (let i = 0; i < accounts.length; i++) {
      // if (accounts[i].dataFile.name === 'cb.amazon.history.csv') {
      const { name: dataFileName, hasHeaders } = accounts[i].dataFile
      const dataFileHasHeaders = hasHeaders === false ? hasHeaders : true
      const rawData = await readCsvFile(dataFileName, dataFileHasHeaders)
      if (loadRaw) {
        await insertMany('raw-data', rawData)
      }
      const transformedData = _transformData(accounts[i], rawData)
      const inserted = await insertMany(DATA_COLLECTION_NAME, transformedData)
      docsInserted += inserted.length
      // }
    }
    await createIndex(DATA_COLLECTION_NAME, dataFields.description.name, {
      collation: { caseLevel: true, locale: 'en_US' }
    })
    await createIndex(DATA_COLLECTION_NAME, dataFields.type.name, {
      collation: { caseLevel: true, locale: 'en_US' }
    })
    await runRules()
    green('Number of docs imported', docsInserted)
    return JSON.stringify([
      {
        operation: 'load data',
        status: 'success',
        numDocsLoaded: docsInserted
      }
    ])
  } catch (e) {
    redf('dataImport ERROR:', e.message)
    console.log(e)
    return JSON.stringify([{}])
  }
}

export default dataImport


/*
const validator = {
  bsonType: 'object',
  $jsonSchema: {
    required: [
      dataFields.acctId.name,
      // dataFields.date.name,
      // dataFields.description.name,
      // dataFields.origDescription.name,
      // dataFields.credit.name,
      // dataFields.debit.name,
      // dataFields.category1.name,
      // dataFields.category2.name,
      // dataFields.checkNumber.name,
      // dataFields.type.name,
      dataFields.omit.name
    ],

    properties: {
      [dataFields.acctId.name]: {
        bsonType: 'string'
      }
      // [dataFields.date.name]: {
      //   bsonType: 'date'
      // },
      // [dataFields.description.name]: {
      //   bsonType: 'string'
      // },
      // [dataFields.origDescription.name]: {
      //   bsonType: 'string'
      // },
      // [dataFields.credit.name]: {
      //   bsonType: 'double'
      // }
      // [dataFields.debit.name]: {
      //   bsonType: 'double'
      // },
      // [dataFields.checkNumber.name]: {
      //   bsonType: 'string'
      // },
      // [dataFields.type.name]: {
      //   bsonType: 'string'
      // },
      // [dataFields.omit.name]: {
      //   bsonType: 'bool'
      // },
      // [dataFields.ruleIds.name]: {
      //   bsonType: 'array'
      // }
    }
  }
}

*/