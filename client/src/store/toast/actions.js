import shortid from 'shortid'
import actionKeys from 'actionKeys'

// eslint-disable-next-line
import { yellow } from 'logger'

/**
 *
 * @param {toast} toast object {error, id, level, message}
 */

// export const setToast = ({
//   error,
//   id = shortid.generate(),
//   level,
//   message
// }) => {
//   return {
//     type: SET_TOAST,
//     payload: { error, id, level, message }
//   }
  
// }

export const setToast = {

  fn: ({
    error,
    id = shortid.generate(),
    level,
    message
  }) => ({
    type: actionKeys.setToast,
    payload: { error, id, level, message }
  }),

  key: actionKeys.toastSetKey
}

// export const clearToast = () => ({
//   type: CLEAR_TOAST
// })

export const clearToast = {
  fn: () => ({ type: actionKeys.clearToast }),
  key: actionKeys.toastClearKey
}
