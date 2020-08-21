import { SET_TOAST, CLEAR_TOAST } from './constants'

// eslint-disable-next-line
import { blue } from 'logger'

export const toastReducer = (state = null, { type, payload }) => {
  switch (type) {
    case SET_TOAST:
      return payload
    case CLEAR_TOAST:
      return null
    default:
      return state
  }
}
