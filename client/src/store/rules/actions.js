import { setToast } from 'store/toast/actions'
import { createRequestThunk } from '../action-helpers'
import api from 'api'
import { TOAST_WARN } from 'global-constants'
import actionKeys from 'actionKeys'

// eslint-disable-next-line
import { orange } from 'logger'

// export const ruleNew = newRule => {
//   return {
//     type: RULE_NEW_KEY,
//     payload: newRule
//   }
// }

// export const ruleCreate = newRule => {
//   return {
//     type: RULE_CREATE_KEY,
//     payload: newRule
//   }
// }

// export const ruleTmpAddAction = data => {
//   return {
//     type: RULETMP_ADD_KEY,
//     payload: data
//   }
// }

export const ruleTmpAddAction = {
  fn: (data) => ({
    type: actionKeys.ruleTmpAddKey,
    payload: data
  }),
  key: actionKeys.ruleTmpAddKey
}

// export const ruleTmpUpdateAction = data => {
//   return {
//     type: RULETMP_UPDATE_KEY,
//     payload: data
//   }
// }

export const ruleTmpUpdateAction = {
  fn: (data) => ({
    type: actionKeys.ruleTmpUpdateKep,
    payload: data
  }),
  key: actionKeys.ruleTmpUpdateKep
}

// export const ruleTmpRemoveAction = ruleId => {
//   return {
//     type: RULETMP_REMOVE_KEY,
//     payload: { ruleId }
//   }
// }

export const ruleTmpRemoveAction = {
  fn: (ruleId) => ({
    type: actionKeys.ruleTmpRemoveKey,
    payload: { ruleId }
  }),
  key: actionKeys.ruleTmpRemoveKey
}

// const rulesReadAction = data => {
//   return {
//     type: RULES_READ_KEY,
//     payload: data
//   }
// }

const rulesReadAction = {
  fn: (data) => ({
    type: actionKeys.rulesReadKey,
    payload: data
  }),
  key: actionKeys.rulesReadKey
}

// export const ruleReadByIdRequestAction = createRequestThunk({
//   request: api.rules.readById,
//   key: RULE_READ_BY_ID_REQUEST_KEY,
//   success: [rulesReadAction],
//   failure: [
//     e =>
//       setToast({ error: e, message: 'Could not get rules', level: TOAST_WARN })
//   ]
// })

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

// const ruleUpdateAction = data => {
//   return {
//     type: RULE_UPDATE_KEY,
//     payload: data
//   }
// }

const ruleUpdateAction = {
  fn: (data) => ({
    type: actionKeys.ruleUpdateKey,
    payload: data
  }),
  key: actionKeys.ruleUpdateKey
}

// export const rulesReadRequestAction = createRequestThunk({
//   request: api.rules.read,
//   key: RULES_READ_REQUEST_KEY,
//   success: [rulesReadAction],
//   failure: [
//     e =>
//       setToast({ error: e, message: 'Could not get data', level: TOAST_WARN })
//   ]
// })

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

// export const ruleCreateRequestAction = createRequestThunk({
//   request: api.rules.create,
//   key: RULE_CREATE_REQUEST_KEY,
//   // a successful create will always return [rule]
//
// TODO: rulesReadRequestAction does not take any params?
//   success: [rulesReadRequestAction],
//   failure: [
//     e =>
//       setToast({
//         error: e,
//         message: 'Some fields need attention',
//         level: TOAST_WARN
//       })
//   ]
// })

export const ruleCreateRequestAction = createRequestThunk({
  request: {
    fn: api.rules.create,
    key: actionKeys.ruleCreateRequestKey
  },
  success: [rulesReadRequestAction],
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

// Delete
// export const ruleDeleteRequestAction = createRequestThunk({
//   request: api.rules.delete,
//   key: RULE_DELETE_REQUEST_KEY,
//   success: [rulesReadRequestAction],
//   failure: [
//     e =>
//       setToast({ error: e, message: 'Could not deleteRule', level: TOAST_WARN })
//   ]
// })

export const ruleDeleteRequestAction = createRequestThunk({
  request: {
    fn: api.rules.delete,
    key: actionKeys.ruleDeleteRequestKey
  },
  success: [rulesReadRequestAction]
  // failure: [
  //   e =>
  //     setToast({ error: e, message: 'Could not deleteRule', level: TOAST_WARN })
  // ]
})

// Update
// export const ruleUpdateRequestAction = createRequestThunk({
//   request: api.rules.update,
//   key: RULE_UPDATE_REQUEST_KEY,
//   success: [ruleUpdateAction],
//   failure: [
//     e =>
//       setToast({ error: e, message: 'Could not get data', level: TOAST_WARN })
//   ]
// })

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
