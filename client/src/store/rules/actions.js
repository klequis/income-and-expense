import { setToast } from 'store/toast/actions'
import { createRequestThunk } from '../action-helpers'
import api from 'api'
import { TOAST_WARN } from 'global-constants'
import actionKeys from 'actionKeys'

// eslint-disable-next-line
import { orange } from 'logger'

const ruleUpdateAction = {
  fn: (data) => ({
    type: actionKeys.ruleUpdateKey,
    payload: data
  }),
  key: actionKeys.ruleUpdateKey
}

export const ruleUpdateRequestAction = createRequestThunk({
  request: {
    fn: api.rules.update,
    key: actionKeys.ruleUpdateRequestKey
  },
  success: [ruleUpdateAction]
  // failure: [
  //   e =>
  //     setToast({ error: e, message: 'Could not get data', level: TOAST_WARN })
  // ]
})

// Read //

const rulesReadAction = {
  fn: (data) => ({
    type: actionKeys.rulesReadKey,
    payload: data
  }),
  key: actionKeys.rulesReadKey
}

export const ruleReadByIdRequestAction = createRequestThunk({
  request: {
    fn: api.rules.readById,
    key: actionKeys.ruleReadByIdRequestKey
  },
  success: [rulesReadAction]
  // failure: [
  //   e =>
  //     setToast({ error: e, message: 'Could not get rules', level: TOAST_WARN })
  // ]
})

export const rulesReadRequestAction = createRequestThunk({
  request: {
    fn: api.rules.read,
    key: actionKeys.rulesReadRequestKey
  },
  success: [rulesReadAction]
  // failure: [
  //   e =>
  //     setToast({ error: e, message: 'Could not get data', level: TOAST_WARN })
  // ]
})

console.log('rulesReadRequestAction', rulesReadRequestAction)

// Create //

export const ruleCreateRequestAction = createRequestThunk({
  request: {
    fn: api.rules.create,
    key: actionKeys.ruleCreateRequestKey
  },
  success: [rulesReadAction],
  failure: [
    {
      fn: (e) =>
        setToast({
          error: e,
          message: 'Some fields need attention',
          level: TOAST_WARN
        }),
      key: actionKeys.toastSetKey
    }
  ]
})

// Delete //

export const ruleDeleteRequestAction = createRequestThunk({
  request: {
    fn: api.rules.delete,
    key: actionKeys.ruleDeleteRequestKey
  },
  success: [rulesReadAction]
  // failure: [
  //   e =>
  //     setToast({ error: e, message: 'Could not deleteRule', level: TOAST_WARN })
  // ]
})