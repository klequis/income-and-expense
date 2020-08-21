import actionKeys from 'actionKeys'

// eslint-disable-next-line
import { blue } from 'logger'

export const rowIdShowReducer = (state = '', { type, payload }) => {
  
  switch (type) {
    case actionKeys.rowIdShowClearKey:
      return ''
    case actionKeys.rowIdShowSetKey:
      return payload
    default:
      return state
  }
}

export const currentViewNameReducer = (state = '', { type, payload }) => {
  switch (type) {
    case actionKeys.currentViewNameClear:
      return ''
    case actionKeys.currentViewNameSet:
      return payload
    default:
      return state
  }
}
