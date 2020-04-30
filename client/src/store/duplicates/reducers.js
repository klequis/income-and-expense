import {
  DUPLICATES_READ_KEY,
  // DUPLICATES_UPDATE_KEY,
} from './constants'

import { blue } from 'logger'

export const duplicatesReducer = (state= [], { type, payload }) => {
  switch (type) {
    case DUPLICATES_READ_KEY:
      blue('duplicates.length', payload.length)
      return payload
    default:
      return state
  }
}
