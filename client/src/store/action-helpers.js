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


export const createRequestThunk = ({
  request,
  success = [],
  failure = []
}) => {
  return (...args) => async (dispatch) => {
    console.group('createRequestThunk')
    pink('request.key', request.key)
    pink('typeof request.fn', request.fn)
    pink('success', success)
    pink('failure', failure)
    

    // if (!R.has('key')(request)) {
    //   throw new Error(`request missing key`)
    // }

    // add request and success keys here OR
    // add all keys here and put a finally?
    dispatch(actionsPendingAdd.fn(request.key))
    success.forEach(s => {
      pink('success key', s.key)
      dispatch(actionsPendingAdd.fn(s.key))
    })
    failure.forEach(f => {
      pink('failure key', f.key)
      dispatch(actionsPendingAdd.fn(f.key))
    })
    console.groupEnd()
    try {
      dispatch(requestPendingAction.fn(request.key))
      // dispatch(actionsPendingAdd.fn(request.key))
      const data = await request.fn(...args)
      dispatch(requestSuccessAction.fn(request.key))
      success.map(async (actionCreator) => {
        dispatch(actionCreator.fn(data))
        // dispatch(actionsPendingRemove.fn(request.key))
      })
    } catch (e) {
      dispatch(requestFailedAction.fn(e, request.key))
      // return failure.map(async (actionCreator) => {
      //   red('action.helpers.createRequestThunk Error', e.message)
      //   console.log(e)
      //   dispatch(requestFailedAction.fn(e, request.key))
      //   await dispatch(actionCreator(e))
      // })
    } finally {
      red('FINALLY')
      dispatch(actionsPendingRemove.fn(request.key))
      success.forEach(s => dispatch(actionsPendingRemove.fn(s.key)))
      failure.forEach(f => dispatch(actionsPendingRemove.fn(f.key)))
    }
  }
}