import {
  ROW_ID_SHOW_CLEAR_KEY,
  ROW_ID_SHOW_SET_KEY,
  CURRENT_VIEW_NAME_CLEAR,
  CURRENT_VIEW_NAME_SET
} from './constants'

// eslint-disable-next-line
import { blue } from 'logger'

export const rowIdShowReducer = (state = '', { type, payload }) => {
  
  switch (type) {
    case ROW_ID_SHOW_CLEAR_KEY:
      return ''
    case ROW_ID_SHOW_SET_KEY:
      return payload
    default:
      return state
  }
}

export const currentViewNameReducer = (state = '', { type, payload }) => {
  switch (type) {
    case CURRENT_VIEW_NAME_CLEAR:
      return ''
    case CURRENT_VIEW_NAME_SET:
      return payload
    default:
      return state
  }
}
