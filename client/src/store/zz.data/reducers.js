import { DATA_CREATE_KEY, DATA_READ_KEY } from './constants'
import { VIEW_READ_KEY } from '../views/constants'

// eslint-disable-next-line
import { blue, green } from 'logger'

export function dataReducer(
  state = [],
  action
) {
  switch (action.type) {
    case DATA_READ_KEY:
    case VIEW_READ_KEY:
      return action.payload
    case DATA_CREATE_KEY:
      return [...state, action.payload[0]]
    default:
      return state
  }
}
