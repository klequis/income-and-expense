import {
  REQUEST_FAILURE,
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_PENDING_ADD,
  REQUEST_PENDING_REMOVE
} from 'global-constants'
import actionKeys from 'actionKeys'

import { yellow } from 'logger'


export const actionsPendingAdd = (key) => {
  return {
    type: actionKeys.actionsPendingAdd,
    payload: key
  }
}

export const actionsPendingRemove = (key) => {
  return {
    type: actionKeys.actionsPendingRemove,
    payload: key
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
