import wrap from 'routes/wrap'
import writeToCsvFile from './jsonToCsv'

// eslint-disable-next-line
import { red, green, yellow } from 'logger'

const exportData = wrap(async (req, res, next) => {
  try {
    await writeToCsvFile()
    res.send(JSON.stringify({ status: 'success' }))
  } catch (e) {
    red('exportData ERROR', e.message)
    console.log(e)
    res.send(JSON.stringify({ status: 'failure' }))
  }
})

export default exportData
