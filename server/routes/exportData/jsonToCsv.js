import { find } from 'db'
import { DATA_COLLECTION_NAME } from 'db/constants'
import fs from 'fs'
// eslint-disable-next-line
import { yellow } from 'logger'

const jsonToCsv = (json) => {
  const replacer = (key, value) => (value === null ? '' : value) // specify how you want to handle null values here
  const header = [
    'acctId',
    'date',
    'description',
    'debit',
    'credit',
    'category1',
    'category2',
    'checkNumber',
    'origDescription',
    'type',
    'omit',
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
  // yellow('year', year)
  const month = d.getMonth().toString().padStart(2, '0')
  // yellow('month', month)
  const day = d.getDay().toString().padStart(2, '0')
  // yellow('day', day)
  const hour = d.getHours().toString().padStart(2, '0')
  // yellow('hour', hour)
  const minute = d.getMinutes().toString().padStart(2, '0')
  // yellow('minutes', minute)
  const second = d.getSeconds().toString().padStart(2, '0')
  // yellow('seconds', second)
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

const writeCsvFile = async () => {
  const data = await find(DATA_COLLECTION_NAME, { omit: false })
  const csvData = jsonToCsv(data)
  await writeFile(csvData)
}

export default writeCsvFile
