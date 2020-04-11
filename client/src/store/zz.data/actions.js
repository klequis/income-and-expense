import {
  DATA_CREATE_KEY,
  DATA_CREATE_REQUEST_KEY,
  DATA_DELETE_REQUEST_KEY,
  DATA_READ_KEY,
  DATA_READ_REQUEST_BY_CRITERIA_KEY,
  DATA_READ_BY_ID_REQUEST_KEY,
  DATA_READ_REQUEST_KEY,
  DATA_UPDATE_REQUEST_KEY,
  IMPORT_DATA_REQUEST_KEY,
  DATA_VIEW_READ_REQUEST
} from './constants'

import { setToast } from 'store/toast/actions'

import { setValidationErrors } from 'store/validation/actions'

import { createRequestThunk } from '../action-helpers'
import api from 'api'
import { TOAST_WARN } from 'global-constants'

// eslint-disable-next-line
import { purple, green, red } from 'logger'

const logApiError = e => {
  return {
    type: 'API_ERROR',
    errors: e
  }
}

export const dataAdd = newTodo => {
  return {
    type: DATA_CREATE_KEY,
    payload: newTodo
  }
}

// Read
export const dataRead = data => {
  return {
    type: DATA_READ_KEY,
    payload: data
  }
}

export const dataReadByIdRequest = createRequestThunk({
  request: api.data.readById,
  key: DATA_READ_BY_ID_REQUEST_KEY,
  success: [dataRead],
  // failure: [logApiError]
  failure: [
    e =>
      setToast({ error: e, message: 'Could not get data', level: TOAST_WARN })
  ]
})

// Create
export const dataCreateRequest = createRequestThunk({
  request: api.data.create,
  key: DATA_CREATE_REQUEST_KEY,
  // a successful create will always return [data]
  success: [data => dataReadRequest(data[0].userId)],
  failure: [
    setValidationErrors,
    e =>
      setToast({
        error: e,
        message: 'Some fields need attention',
        level: TOAST_WARN
      })
  ]
})

// Delete
export const dataDeleteRequest = createRequestThunk({
  request: api.data.delete,
  key: DATA_DELETE_REQUEST_KEY,
  // success: [todosReadRequest],
  // success: [todo => console.log(todo)],
  success: [data => dataReadRequest(data[0].userId)],
  failure: [logApiError]
})

// Update
export const dataUpdateRequest = createRequestThunk({
  request: api.data.update,
  key: DATA_UPDATE_REQUEST_KEY,
  success: [data => dataReadRequest(data[0].userId)],
  failure: [logApiError]
})

// Read
export const dataReadRequest = createRequestThunk({
  request: api.data.read,
  key: DATA_READ_REQUEST_KEY,
  success: [dataRead],
  failure: [
    e =>
      setToast({ error: e, message: 'Could not get data', level: TOAST_WARN })
  ]
})

export const dataViewReadRequest = createRequestThunk({
  request: api.views.read,
  key: DATA_VIEW_READ_REQUEST,
  success: [dataRead],
  failure: [
    e =>
      setToast({ error: e, message: 'Could not get data', level: TOAST_WARN })
  ]
})

export const dataReadByCriteriaRequest = createRequestThunk({
  request: api.data.readByCriteria,
  key: DATA_READ_REQUEST_KEY,
  success: [dataRead],
  failure: [
    e =>
      setToast({ error: e, message: 'Could not get data', level: TOAST_WARN })
  ]
})

// import data
export const importDataRequest = createRequestThunk({
  request: api.data.importData,
  key: IMPORT_DATA_REQUEST_KEY,
  // success: [() => dataReadRequest()],
  success: [
    // data =>
    //   setToast({ message: `${data[0].numDocsLoaded}`, level: TOAST_INFO }),
    // data => dataRead(data)
    dataReadRequest
  ],
  // failure: [logApiError]
  failure: [() => console.log('import fail')]
})
