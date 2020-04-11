import { SET_TOAST, CLEAR_TOAST } from './constants'
import shortid from 'shortid'
// import { yellow } from 'logger'

/**
 *
 * @param {toast} toast object {error, id, level, message}
 */

export const setToast = ({
  error,
  id = shortid.generate(),
  level,
  message
}) => {
  return {
    type: SET_TOAST,
    payload: { error, id, level, message }
  }
  
}
export const clearToast = () => ({
  type: CLEAR_TOAST
})
