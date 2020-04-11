import {
  CURRENT_VIEW_NAME_SET,
  CURRENT_VIEW_NAME_CLEAR,
  ROW_ID_SHOW_CLEAR_KEY,
  ROW_ID_SHOW_SET_KEY
} from './constants'

// eslint-disable-next-line
import { yellow } from 'logger'

export const currentViewNameSetAction = viewName => {
  return {
    type: CURRENT_VIEW_NAME_SET,
    payload: viewName
  }
}

export const currentViewNameClearAction = () => {
  return {
    type: CURRENT_VIEW_NAME_CLEAR
  }
}

export const rowIdShowClearAction = () => {
  return {
    type: ROW_ID_SHOW_CLEAR_KEY
  }
}

export const rowIdShowSetAction = tableRowId => {
  return {
    type: ROW_ID_SHOW_SET_KEY,
    payload: tableRowId
  }
}

