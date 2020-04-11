import {
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
} from 'global-constants'

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
