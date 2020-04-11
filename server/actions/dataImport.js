import { createIndex, dropCollection, find, insertMany } from 'db'
import { ACCOUNTS_COLLECTION_NAME, DATA_COLLECTION_NAME } from 'db/constants'
import csv from 'csvtojson'
import R from 'ramda'
import runRules from './runRules'
import dataFields from 'dataCollection'

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

const isDebit = (value) => value < 0
const isCredit = (value) => value > 0
const removeDoubleSpace = (value) => value.replace(/\s{2,}/g, ' ').trim()
const checkO = (o) => {
  const keys = Object.keys(o)
  keys.forEach((key) => {
    if (R.isNil(o[key])) {
      red(`field${key} `, typeof o[key])
    }
  })
}

const _transformCreditDebit = (swapCreditDebit, value) => {
  const nv1 = typeof value === 'string' ? 0 : value
  const nv2 = swapCreditDebit ? _swapCreditDebit(nv1) : nv1
  return nv2
}

/*
    data collection field names are: field[n]
*/

// new

const _replaceStringWithZero = (value) =>
  typeof value === 'string' ? 0 : value

const evolver = {
  description: R.pipe(removeDoubleSpace, R.trim),
  origDescription: R.pipe(removeDoubleSpace, R.trim),
  date: R.identity,
  credit: R.pipe(
    _replaceStringWithZero,
    R.cond([
      [R.gt(R.__, 0), (x) => x],
      [R.T, R.always(0)]
    ])
  ),
  debit: R.pipe(
    _replaceStringWithZero,
    R.cond([
      [R.lt(R.__, 0), (x) => x],
      [R.T, R.always(0)]
    ])
  )
}

const _swapCreditDebit = (doc) => {
  const { credit, debit } = doc
  const newCredit = credit !== 0 ? -credit : credit
  const newDebit = debit !== 0 ? -debit : debit
  const newDoc = R.mergeRight(doc, { credit: newCredit, debit: newDebit })
  return newDoc
}

// const _swapCreditDebit = (value) => {
//   if (value === 0) {
//     return value
//   }

//   return value * -1
// }

const emptyString = (x) => 'hi'

const log = (label) => (message) => {
  // if (message.checkNumber !== '') {
  return yellow(label, message)
  // } else {
  // return console.log()
  // }
}

const getFieldCols = (fieldToCol) => {
  const acctId = R.path(['acctId', 'col'], fieldToCol) || null
  const date = R.path(['date', 'col'], fieldToCol) || null
  const description = R.path(['description', 'col'], fieldToCol) || null
  const debit = R.path(['debit', 'col'], fieldToCol) || null
  const credit = R.path(['credit', 'col'], fieldToCol) || null
  const type = R.path(['type', 'col'], fieldToCol) || null
  const checkNumber = R.path(['checkNumber', 'col'], fieldToCol) || null
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

const getFieldValue = (column) => (doc) => {
  try {
    const ret = R.prop(`field${column}`)(doc) || ''
    return ret
  } catch (e) {
    redf('getFieldValue ERROR', e.message)
    console.log(e)
  }
}

const _transformDataNew = (account, data) => {
  const { fieldToCol, swapCreditDebit, acctId } = account

  const fieldCols = getFieldCols(fieldToCol)

  // DEBUG type
  // getFieldValue(R.prop(dataFields.type)(fieldCols))(doc),
  // yellow('dataFields.type', dataFields.type)
  // yellow('fieldCols', fieldCols)
  // yellow('col num', R.prop(dataFields.type)(fieldCols))
  //

  try {
    const mapToFields = (doc) => {
      const ret = {
        acctId,
        description: getFieldValue(R.prop(dataFields.description)(fieldCols))(
          doc
        ),
        origDescription: getFieldValue(
          R.prop(dataFields.description)(fieldCols)
        )(doc),
        date: getFieldValue(R.prop(dataFields.date)(fieldCols))(doc),
        credit: getFieldValue(R.prop(dataFields.credit)(fieldCols))(doc),
        debit: R.pipe(getFieldValue(R.prop(dataFields.debit)(fieldCols)))(doc),
        category1: 'none',
        category2: '',
        checkNumber: getFieldValue(R.prop(dataFields.checkNumber)(fieldCols))(
          doc
        ),
        type: getFieldValue(R.prop(dataFields.type)(fieldCols))(doc),
        omit: false
      }
      return ret
    }
    const transform = R.compose(
      R.when(R.always(swapCreditDebit), _swapCreditDebit),
      // R.tap(log('after evolve')),
      R.evolve(evolver),
      // R.tap(log('after map')),
      mapToFields
      // R.tap(log('start'))
    )

    return R.map(transform, data)
  } catch (e) {
    red('acctId', acctId)
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
      // if (accounts[i].acctId === 'cb.chase.chk.2465') {
      const { name: dataFileName, hasHeaders } = accounts[i].dataFile
      const dataFileHasHeaders = hasHeaders === false ? hasHeaders : true
      const rawData = await readCsvFile(dataFileName, dataFileHasHeaders)

      // DEBUG
      if (accounts[i].acctId === 'costco.citibank.credit-card.2791') {
        for (let x = 0; x < rawData.length; x++) {
          
            // yellow('raw', rawData[i])
            // yellow('field4 - credit', R.prop('field3')(rawData[x]))
            console.log('-------------')
            yellow('field4 - credit', R.prop('field4')(rawData[x]))
            yellow('field5 - debit', R.prop('field5')(rawData[x]))
            console.log('-------------')
          
        }
      }

      if (loadRaw) {
        await insertMany('raw-data', rawData)
      }

      const transformedData = _transformDataNew(accounts[i], rawData)

      // DEBUB
      // yellow(
      //   'transformedData',
      //   transformedData
      //     .filter((i) => i.acctId === 'costco.citibank.credit-card.2791')
      //     .map((i) => `credit()`)
      // )

      const inserted = await insertMany(DATA_COLLECTION_NAME, transformedData)

      docsInserted += inserted.length
      // }
    }
    await createIndex(DATA_COLLECTION_NAME, 'description', {
      collation: { caseLevel: true, locale: 'en_US' }
    })
    await createIndex(DATA_COLLECTION_NAME, 'type', {
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
