import actionKeys from 'actionKeys'

// eslint-disable-next-line
import { yellow } from 'logger'

// export const currentViewNameSetAction = viewName => {
//   return {
//     type: CURRENT_VIEW_NAME_SET,
//     payload: viewName
//   }
// }

export const currentViewNameSetAction = {
  fn: viewName => ({
    type: actionKeys.currentViewNameSet,
    payload: viewName
  }),
  key: actionKeys.currentViewNameSet
}

// export const currentViewNameClearAction = () => {
//   return {
//     type: CURRENT_VIEW_NAME_CLEAR
//   }
// }

export const currentViewNameClearAction = {
  fn: () => ({
    type: actionKeys.currentViewNameClear
  }),
  key: actionKeys.currentViewNameClear
}

// export const rowIdShowClearAction = () => {
//   return {
//     type: ROW_ID_SHOW_CLEAR_KEY
//   }
// }

export const rowIdShowClearAction = {
  fn: () => ({
    type: actionKeys.rowIdShoreClearKey
  }),
  key: actionKeys.rowIdShoreClearKey
}

// export const rowIdShowSetAction = tableRowId => {
//   return {
//     type: ROW_ID_SHOW_SET_KEY,
//     payload: tableRowId
//   }
// }

export const rowIdShowSetAction = {
  fn: tableRowId => ({
    type: actionKeys.tableRowId,
    payload: tableRowId
  }),
  key: actionKeys.tableRowId
}