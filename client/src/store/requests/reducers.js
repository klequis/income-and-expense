import {
  REQUEST_SUCCESS,
  REQUEST_PENDING,
  REQUEST_FAILURE,
} from 'global-constants'
import {
  API_ERROR
} from './constants'
import { merge, append, without } from 'ramda'
import actionKeys from 'actionKeys'

import { blue } from 'logger'

export function requestsReducer(state = {}, action) {
  switch (action.type) {
    case REQUEST_PENDING:
      return merge(state, {
        [action.requestKey]: { status: REQUEST_PENDING, error: null }
      })
    case REQUEST_SUCCESS:
      return merge(state, {
        [action.requestKey]: { status: REQUEST_SUCCESS, error: null }
      })
    case REQUEST_FAILURE:
      return merge(state, {
        [action.requestKey]: { status: REQUEST_FAILURE, error: action.payload }
      })
    case API_ERROR:
      console.log('store.requests.reducers: API_ERROR: NOT IMPLEMENTED YET')
      return state
    default:
      return state
  }
}

export function actionsPendingReducer(state = [], {type, payload}) {
  switch (type) {
    case actionKeys.actionsPendingAdd:
      blue('INCREMENT: state', state)
      blue('INCREMENT: payload', payload)
      return append(payload, state)
    case actionKeys.actionsPendingRemove:
      blue('DECREMENT: state', state)
      blue('DECREMENT: payload', payload)
      return without(payload, state)
    default:
      return state
  }
}
