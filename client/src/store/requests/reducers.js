import {
  REQUEST_SUCCESS,
  REQUEST_PENDING,
  REQUEST_FAILURE,
  REQUEST_PENDING_COUNT_DECREMENT,
  REQUEST_PENDING_COUNT_INCREMENT
} from 'global-constants'
import {
  API_ERROR
} from './constants'
import { merge } from 'ramda'

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

export function pendingCountReducer(state = 0, {type, payload}) {
  switch (type) {
    case REQUEST_PENDING_COUNT_INCREMENT:
      // blue('INCREMENT: state', state)
      // blue('INCREMENT: payload', payload)
      // const incNewState = ++state
      // blue('INCREMENT: incNewState', incNewState)
      return ++state
    case REQUEST_PENDING_COUNT_DECREMENT:
      // blue('DECREMENT: state', state)
      // blue('DECREMENT: payload', payload)
      // const decNewState = --state
      // blue('INCREMENT: decNewState', decNewState)
      return --state
    default:
      return state
  }
}
