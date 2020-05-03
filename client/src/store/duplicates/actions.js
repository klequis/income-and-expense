import { setToast } from 'store/toast/actions'
import { TOAST_WARN } from 'global-constants'

import { createRequestThunk } from '../action-helpers'
import api from 'api'
import actionKeys from 'actionKeys'

// eslint-disable-next-line
import { orange } from 'logger'

// const duplicatesReadAction = data => {
//   return {
//     type: DUPLICATES_READ_KEY,
//     payload: data
//   }
// }

const duplicatesReadAction = {
  fn: (data) => ({
    type: actionKeys.duplicatesReadKey,
    payload: data
  }),
  key: actionKeys.duplicatesReadKey
}

// export const duplicatesReadRequestAction = createRequestThunk({
//   request: api.duplicates.read,
//   key: DUPLICATES_READ_REQUEST_KEY,
//   success: [duplicatesReadAction],
//   failure: [
//     e =>
//       setToast({ error: e, message: 'Could not get data', level: TOAST_WARN })
//   ]
// })

export const duplicatesReadRequestAction = createRequestThunk({
  request: {
    fn: api.duplicates.read,
    key: actionKeys.duplicatesReadRequestKey
  },
  success: [duplicatesReadAction],
  failure: [
    {
      fn: (e) =>
        setToast.fn({
          error: e,
          message: 'Could not get data',
          level: TOAST_WARN
        }),
      key: setToast.key
    }
  ]
})
