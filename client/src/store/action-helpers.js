// eslint-disable-next-line
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

export const logError = (err, key) => {
  red(`actions.logError(key:${key})`, err)
}

const getKeyFromFunction = (fnStr) => {
  const l = fnStr.split(/\s+/)[6]
  const m = R.match(/\[(.*?)\]/, l)
  return m[1]
}

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
  console.group('request types')
  pink('REQUEST', request)
  pink('typeof REQUEST', R.type(request))
  pink('SUCCESS', success)
  console.groupEnd()
  const returnFn = (...args) => async (dispatch) => {

    // console.group('createRequestThunk')
    // pink('request.key', request.key)
    // pink('typeof request.fn', request.fn)
    // pink('success', success)
    // pink('failure', failure)

    dispatch(actionsPendingAdd.fn(request.key))
    success.forEach(s => {
      pink('pending - success', s)
      dispatch(actionsPendingAdd.fn(getActionKey(s)))
    })
    failure.forEach(f => {
      pink('pending - fail', f)
      dispatch(actionsPendingAdd.fn(getActionKey(f)))
    })
    // console.groupEnd()
    try {
      dispatch(requestPendingAction.fn(request.key))
      const data = await request.fn(...args)
      dispatch(requestSuccessAction.fn(request.key))
      success.map(async (s) => {
        pink('dispatching - success', s)
        dispatch(getActionFn(s)(data))
      })
    } catch (e) {
      dispatch(requestFailedAction.fn(e, request.key))
      console.log(e)
      return failure.map(async (f) => {
        pink('dispatching - fail', f)
        dispatch(getActionFn(f)(e, getActionKey(f)))
      })
    } finally {
      red('FINALLY')
      dispatch(actionsPendingRemove.fn(request.key))
      success.forEach(s => dispatch(actionsPendingRemove.fn(getActionKey(s))))
      failure.forEach(f => dispatch(actionsPendingRemove.fn(getActionKey(f))))
    }
  }
  // pink('returnFn', returnFn)
  return returnFn
}