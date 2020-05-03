// import { IMPORT_DATA_REQUEST_KEY } from './constants'
import { createRequestThunk } from '../action-helpers'
import api from 'api'
import actionKeys from 'actionKeys'

// eslint-disable-next-line
import { purple, green, red } from 'logger'

// import data
// export const importDataRequestAction = createRequestThunk({
//   request: api.data.importData,
//   key: IMPORT_DATA_REQUEST_KEY,
//   // success: [() => dataReadRequest()],
//   success: [],
//   failure: [() => console.log('import fail')]
// })

export const importDataRequestAction = createRequestThunk({
  request: {
    fn: api.data.importData,
    key: actionKeys.importDataRequestKey
  },
  success: [],
  failure: [() => console.log('import fail')]
})