import { find } from 'db'
import { DATA_COLLECTION_NAME, dataFields } from 'db/constants'
import fs from 'fs'
import * as R from 'ramda'


// eslint-disable-next-line
import { yellow, redf } from 'logger'

const jsonToCsv = (json) => {
  const replacer = (key, value) => (value === null ? '' : value) // specify how you want to handle null values here
  const header = [
    dataFields.acctId.name,
    dataFields.date.name,
    dataFields.description.name,
    dataFields.debit.name,
    dataFields.credit.name,
    dataFields.amount.name,
    dataFields.category1.name,
    dataFields.category2.name,
    dataFields.checkNumber.name,
    dataFields.origDescription.name,
    dataFields.type.name,
    dataFields.omit.name,
    '_id'
  ]

  // let csv = json
  //   .map(row =>
  //     header.map(fieldName => {
  //       const d =
  //         fieldName === 'date'
  //           ? format(new Date(row[fieldName]), 'MM/dd/yyyy')
  //           : row[fieldName]
  //       return JSON.stringify(d, replacer)
  //     })
  //   )
  //   .join(',')

  let csv = json.map((row) =>
    header
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(',')
  )
  csv.unshift(header.join(','))
  csv = csv.join('\r\n')
  return csv
}

const makeFileName = () => {
  // yes this is ugly
  const d = new Date()
  const year = d.getFullYear()
  yellow('year', year)
  const month = d.getMonth().toString().padStart(2, '0')
  yellow('month', month)
  const day = d.getDay().toString().padStart(2, '0')
  yellow('day', day)
  const hour = d.getHours().toString().padStart(2, '0')
  yellow('hour', hour)
  const minute = d.getMinutes().toString().padStart(2, '0')
  yellow('minutes', minute)
  const second = d.getSeconds().toString().padStart(2, '0')
  yellow('seconds', second)
  const datePart = `${year}${month}${day}-${hour}${minute}${second}`
  return `${datePart}.income-expense.csv`
}

const writeFile = async (csv) => {
  const res = await fs.promises.writeFile(
    // `/home/klequis/Downloads/${format(new Date(), 'ddMMyyyy')}data.csv`,
    `/home/klequis/Documents/income-expense.wk/${makeFileName()}`,
    csv,
    'utf8'
  )
  return res
}

const addDiff = (doc) => {
  // yellow('doc', doc)
  const { debit, credit } = doc
  yellow('debit', debit)
  yellow('credit', credit)
  const ret = R.mergeRight(doc, { amount: R.sum([debit, credit]) })
  // yellow('ret', ret)
  return ret
}

const writeCsvFile = async () => {
  try {
    const data = await find(DATA_COLLECTION_NAME, { omit: false })
    const a = R.map(addDiff, data)
    yellow('a', a)
    const csvData = jsonToCsv(a)
    await writeFile(csvData)
  } catch (e) {
    redf('writeCsvFile ERROR', e.message)
    console.log(e)
  }
}

export default writeCsvFile
