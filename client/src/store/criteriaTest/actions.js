import { setToast } from 'store/toast/actions'
import { createRequestThunk } from '../action-helpers'
import api from 'api'
import { TOAST_WARN } from 'global-constants'
import actionKeys from 'actionKeys'

// eslint-disable-next-line
import { yellow } from 'logger'

// const criteriaTestReadAction = data => {
//   return {
//     type: CRITERIA_TEST_READ_KEY,
//     payload: data
//   }
// }

const criteriaTestReadAction = {
  fn: data => ({
    type: actionKeys.criteriaTestReadKey,
    payload: data
  }),
  key: actionKeys.criteriaTestReadKey
}

// export const criteriaTestClearAction = () => {
//   return {
//     type: CRITERIA_TEST_CLEAR_KEY
//   }
// }

export const criteriaTestClearAction = {
  fn: () => ({ type: actionKeys.criteriaTestClearKey }),
  key: actionKeys.criteriaTestClearKey
}

// export const criteriaTestReadRequestAction = createRequestThunk({
//   request: api.criteria.read,
//   key: CRITERIA_TEST_READ_REQUEST_KEY,
//   success: [criteriaTestReadAction],
//   failure: [
//     e =>
//       setToast({ error: e, message: 'Could not get data', level: TOAST_WARN })
//   ]
// })

export const criteriaTestReadRequestAction = createRequestThunk({
  request: {
    fn: api.criteria.read,
    key: actionKeys.criteriaTestReadRequestKey
  },
  success: [criteriaTestReadAction],
  // failure: [
  //   e =>
  //     setToast({ error: e, message: 'Could not get data', level: TOAST_WARN })
  // ]
})
