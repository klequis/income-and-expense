import { find } from 'db'
import { DATA_COLLECTION_NAME } from 'db/constants'
import fs from 'fs'
import { format } from 'date-fns'
import { mergeRight } from 'ramda'

import { yellow } from 'logger'

const jsonToCsv = (json) => {
  const replacer = (key, value) => (value === null ? '' : value) // specify how you want to handle null values here
  const header = [
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
  yellow('csv', csv)
  csv.unshift(header.join(','))
  csv = csv.join('\r\n')
  return csv
}

const writeFile = async (csv) => {
  const res = await fs.promises.writeFile(
    // `/home/klequis/Downloads/${format(new Date(), 'ddMMyyyy')}data.csv`,
    `/home/klequis/Downloads/new-data.csv`,
    // `new-data.csv`,
    csv,
    'utf8'
  )
  return res
}

const writeCsvFile = async () => {
  const data = await find(DATA_COLLECTION_NAME, {})
  const csvData = jsonToCsv(data)
  await writeFile(csvData)
}

export default writeCsvFile
