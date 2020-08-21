// // eslint-disable-next-line
import {
  actionsPendingAdd,
  actionsPendingRemove,
  requestPendingAction,
  requestSuccessAction,
  requestFailedAction,
} from './requests/actions'

import * as R from 'ramda'

// eslint-disable-next-line
import { pink, red } from 'logger'

const LOG = false

export const logError = (err, key) => {
  red(`actions.logError(key:${key})`, err)
}

// const getKeyFromFunction = (fnStr) => {
//   const l = fnStr.split(/\s+/)[6]
//   const m = R.match(/\[(.*?)\]/, l)
//   return m[1]
// }

const getActionKey = action => R.type(action) === 'Object'
  ? action.key
  : action.request.key
    

const getActionFn = action => R.type(action) === 'Object'
  ? action.fn
  : action.request.fn

export const createRequestThunk = ({
  request,
  success = [],
  failure = []
}) => {
  LOG && console.group('request types')
  LOG && pink('REQUEST', request)
  LOG && pink('typeof REQUEST', R.type(request))
  LOG && pink('SUCCESS', success)
  LOG && console.groupEnd()
  const returnFn = (...args) => async (dispatch) => {

    // console.group('createRequestThunk')
    // pink('request.key', request.key)
    // pink('typeof request.fn', request.fn)
    // pink('success', success)
    // pink('failure', failure)

    dispatch(actionsPendingAdd.fn(request.key))
    success.forEach(s => {
      LOG && pink('success-pending-add', getActionKey(s))
      dispatch(actionsPendingAdd.fn(getActionKey(s)))
    })
    failure.forEach(f => {
      LOG && pink('fail-pending-add', getActionKey(f))
      dispatch(actionsPendingAdd.fn(getActionKey(f)))
    })
    // console.groupEnd()
    try {
      dispatch(requestPendingAction.fn(request.key))
      const data = await request.fn(...args)
      dispatch(requestSuccessAction.fn(request.key))
      success.map(async (s) => {
        LOG && pink('dispatching - success', getActionKey(s))
        dispatch(getActionFn(s)(data))
      })
    } catch (e) {
      dispatch(requestFailedAction.fn(e, request.key))
      console.log(e)
      return failure.map(async (f) => {
        LOG && pink('dispatching - fail', getActionKey(f))
        dispatch(getActionFn(f)(e, getActionKey(f)))
      })
    } finally {
      dispatch(actionsPendingRemove.fn(request.key))
      success.forEach(s => dispatch(actionsPendingRemove.fn(getActionKey(s))))
      failure.forEach(f => dispatch(actionsPendingRemove.fn(getActionKey(f))))
    }
  }
  // pink('returnFn', returnFn)
  return returnFn
}