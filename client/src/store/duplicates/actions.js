import {
  DUPLICATES_READ_KEY,
  DUPLICATES_READ_REQUEST_KEY,
  DUPLICATES_UPDATE_KEY,
  DUPLICATES_UPDATE_REQUEST_KEY
} from './constants'

import { setToast } from 'store/toast/actions'
import { TOAST_WARN } from 'global-constants'

import { createRequestThunk } from '../action-helpers'
import api from 'api'

// eslint-disable-next-line
import { orange } from 'logger'



const duplicatesReadAction = data => {
  return {
    type: DUPLICATES_READ_KEY,
    payload: data
  }
}

export const duplicatesReadRequestAction = createRequestThunk({
  request: api.duplicates.read,
  key: DUPLICATES_READ_REQUEST_KEY,
  success: [duplicatesReadAction],
  failure: [
    e =>
      setToast({ error: e, message: 'Could not get data', level: TOAST_WARN })
  ]
})