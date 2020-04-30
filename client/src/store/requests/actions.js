import {
  REQUEST_FAILURE,
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_PENDING_COUNT_INCREMENT,
  REQUEST_PENDING_COUNT_DECREMENT
} from 'global-constants'

import { yellow } from 'logger'

export const requestPendingCountIncrementAction = (key) => {
  return {
    type: REQUEST_PENDING_COUNT_INCREMENT,
    requestKey: key
  }
}

export const requestPendingCountDecrementAction = (key) => {
  return {
    type: REQUEST_PENDING_COUNT_DECREMENT,
    requestKey: key
  }
}

export const requestPendingAction = (key) => {
  return {
    type: REQUEST_PENDING,
    requestKey: key
  }
}

export const requestSuccessAction = (key) => {
  return {
    type: REQUEST_SUCCESS,
    requestKey: key
  }
}

export const requestFailedAction = (reason, key) => {
  return {
    type: REQUEST_FAILURE,
    payload: reason,
    requestKey: key
  }
}
