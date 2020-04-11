import {
  VIEW_READ_KEY
} from './constants'
import { clone } from 'ramda'

// eslint-disable-next-line
import { blue } from 'logger'

export const viewDataReducer = (state = [], { type, payload }) => {
  switch (type) {
    case VIEW_READ_KEY:
      return clone(payload)
    default:
      return state
  }
}
