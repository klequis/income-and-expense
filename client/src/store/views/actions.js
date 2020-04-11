import { VIEW_READ_KEY, VIEW_READ_REQUEST_KEY } from './constants'
import { setToast } from 'store/toast/actions'
import { createRequestThunk } from '../action-helpers'
import api from 'api'
import { TOAST_WARN } from 'global-constants'

// eslint-disable-next-line
import { yellow } from 'logger'

const viewReadAction = data => {
  return {
    type: VIEW_READ_KEY,
    payload: data
  }
}

export const viewReadRequestAction = createRequestThunk({
  request: api.views.read,
  key: VIEW_READ_REQUEST_KEY,
  success: [viewReadAction],
  failure: [
    e =>
      setToast({ error: e, message: 'Could not get data', level: TOAST_WARN })
  ]
})
