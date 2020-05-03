import actionKeys from 'actionKeys'

import { yellow } from 'logger'

// export const actionsPendingAdd = (key) => {
//   return {
//     type: actionKeys.actionsPendingAdd,
//     payload: key
//   }
// }

export const actionsPendingAdd = {
  fn: (key) => ({ type: actionKeys.actionsPendingAdd, payload: key }),
  key: actionKeys.actionsPendingAdd
}

// export const actionsPendingRemove = (key) => {
//   return {
//     type: actionKeys.actionsPendingRemove,
//     payload: key
//   }
// }

export const actionsPendingRemove = {
  fn: (key) => ({ type: actionKeys.actionsPendingRemove, payload: key }),
  key: actionKeys.actionsPendingRemove
}

// export const requestPendingAction = (key) => {
//   return {
//     type: REQUEST_PENDING,
//     requestKey: key
//   }
// }

export const requestPendingAction = {
  fn: (key) => ({ type: actionKeys.requestPending, payload: key }),
  key: actionKeys.requestPending
}

// export const requestSuccessAction = (key) => {
//   return {
//     type: REQUEST_SUCCESS,
//     requestKey: key
//   }
// }

export const requestSuccessAction = {
  fn: key => ({ type: actionKeys.requestSuccess, payload: key }),
  key: actionKeys.requestSuccess 
}



// export const requestFailedAction = (reason, key) => {
//   return {
//     type: REQUEST_FAILURE,
//     payload: reason,
//     requestKey: key
//   }
// }

export const requestFailedAction = {
  fn: (reason, key) => ({
    type: actionKeys.requestFailure,
    payload: {reason, key},
  })
}
