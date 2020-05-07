import {
  FLOW
} from 'global-constants'
// import { API_ERROR } from './constants'
import * as R from 'ramda'
import actionKeys from 'actionKeys'

import { logReducer } from 'logger'

export function requestsReducer(state = {}, { type, payload }) {


  if (FLOW &&
    R.contains(type, [
      actionKeys.requestPending,
      actionKeys.requestSuccess,
      actionKeys.requestFailure,
      actionKeys.apiError
    ])
  ) {
    logReducer('requestsReducer', state, type, payload)
  }
  
  switch (type) {
    case actionKeys.requestPending:
      return R.merge(state, {
        payload: { status: actionKeys.requestPending, error: null }
      })
    case actionKeys.requestSuccess:
      return R.merge(state, {
        [payload]: { status: actionKeys.requestSuccess, error: null }
      })
    case actionKeys.requestFailure:
      return R.merge(state, {
        [payload]: { status: actionKeys.requestFailure, error: payload }
      })
    case actionKeys.apiError:
      console.log('store.requests.reducers: API_ERROR: NOT IMPLEMENTED YET')
      return state
    default:
      return state
  }
}

export function actionsPendingReducer(state = [], { type, payload }) {

  if (FLOW &&
    R.includes(type, [
      actionKeys.actionsPendingAdd,
      actionKeys.actionsPendingRemove,
    ])
  ) {
    logReducer('actionsPendingReducer', state, type, payload)
  }

  switch (type) {
    case actionKeys.actionsPendingAdd:
      return R.append(payload, state)
    case actionKeys.actionsPendingRemove:
      return R.without(payload, state)
    default:
      return state
  }
}
