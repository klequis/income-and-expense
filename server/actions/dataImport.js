import { createIndex, dropCollection, find, insertMany } from 'db'
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

const evolver = {
  description: R.pipe(removeDoubleSpace, R.trim),
  origDescription: R.pipe(removeDoubleSpace, R.trim),
  date: R.identity,
  credit: R.pipe(
    // _stringToNumber,
    R.cond([
      [R.gt(R.__, 0), (x) => x],
      [R.T, R.always(0)]
    ])
  ),
  debit: R.pipe(
    // _stringToNumber,
    R.cond([
      [R.lt(R.__, 0), (x) => x],
      [R.T, R.always(0)]
    ])
  )
}

const getFieldCols = (fieldToCol) => {
  const acctId = R.path([dataFields.acctId.name, 'col'], fieldToCol) || null
  const date = R.path([dataFields.date.name, 'col'], fieldToCol) || null
  const description =
    R.path([dataFields.description.name, 'col'], fieldToCol) || null
  const debit = R.path([dataFields.debit.name, 'col'], fieldToCol) || null
  const credit = R.path([dataFields.credit.name, 'col'], fieldToCol) || null
  const type = R.path([dataFields.type.name, 'col'], fieldToCol) || null
  const checkNumber =
    R.path([dataFields.checkNumber.name, 'col'], fieldToCol) || null
  const ret = {
    acctId,
    date,
    description,
    debit,
    credit,
    type,
    checkNumber
  }

  return ret
}

const _log = (label) => (message) => {
  if (label === 'start') {
    return green('start ----------------------- /n')
  }
  if (label === 'end') {
    return green('end -----------------------')
  }
  if (label === 'initial') {
    return yellow(label, message)
  }
  // const a = {
  //   desc: message.origDescription,
  //   credit: message.credit,
  //   debit: message.debit
  // }
  // return yellow(label, a)

  return yellow(label, message)
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

const getFieldValue = (fieldCol) => (doc) => {
  if (R.type(fieldCol) === 'Undefined') {
    return ''
  }
  const { col, parse } = fieldCol
  const value = R.prop(`field${col}`)(doc) || ''
  if (!isNil(parse)) {
    return parseFieldValue(parse, value)
  }
  return value
}

const _transformData = (account, data) => {
  const { fieldToCol, acctId } = account

  const fieldCols = getFieldCols(fieldToCol)

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
        debit: R.pipe(getFieldValue(R.prop(dataFields.debit.name)(fieldToCol)))(
          doc
        ),
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
    if (loadRaw) {
      await dropCollection('data-all')
    }
    const accounts = await find(ACCOUNTS_COLLECTION_NAME, {})

    for (let i = 0; i < accounts.length; i++) {
      const { name: dataFileName, hasHeaders } = accounts[i].dataFile
      const dataFileHasHeaders = hasHeaders === false ? hasHeaders : true
      const rawData = await readCsvFile(dataFileName, dataFileHasHeaders)
      if (loadRaw) {
        await insertMany('raw-data', rawData)
      }
      const transformedData = _transformData(accounts[i], rawData)
      const inserted = await insertMany(DATA_COLLECTION_NAME, transformedData)
      docsInserted += inserted.length
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
