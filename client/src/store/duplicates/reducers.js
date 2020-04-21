import {
  DUPLICATES_READ_KEY,
  // DUPLICATES_UPDATE_KEY,
} from './constants'

export const duplicatesReducer = (state= [], { type, payload }) => {
  switch (type) {
    case DUPLICATES_READ_KEY:
      return payload
    default:
      return state
  }
}
