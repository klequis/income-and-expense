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

    const _dispatch = action => {

    }

    dispatch(actionsPendingAdd.fn(request.key))
    success.forEach(s => {
      // if (R.type(s) === 'Object') {
      //   dispatch(actionsPendingAdd.fn(s.key))
      // } else {
      //   dispatch(actionsPendingAdd.fn(s.request.key))
      // }
      dispatch(actionsPendingAdd.fn(getActionKey(s)))
    })
    failure.forEach(f => {
      // if (R.type(f) === 'Object') {
      //   dispatch(actionsPendingAdd.fn(f.key))
      // } else {
      //   dispatch(actionsPendingAdd.fn(f.request.key))
      // }
      dispatch(actionsPendingAdd.fn(getActionKey(f)))
    })
    // console.groupEnd()
    try {
      dispatch(requestPendingAction.fn(request.key))
      // dispatch(actionsPendingAdd.fn(request.key))
      const data = await request.fn(...args)
      dispatch(requestSuccessAction.fn(request.key))
      success.map(async (s) => {
        // if (R.type(actionCreator) === 'Object') {
        //   dispatch(actionCreator.fn(data))
        // } else {
        //   dispatch(actionCreator.request.fn(data))
        // }
        dispatch(getActionFn(s)(data))
        // red('typeof actionCreator', R.type(actionCreator))
        
        // dispatch(actionsPendingRemove.fn(request.key))
      })
    } catch (e) {
      
      dispatch(requestFailedAction.fn(e, request.key))
      red('action.helpers.createRequestThunk Error', e.message)
      console.log(e)
      return failure.map(async (f) => {
        // if (R.type(actionCreator === 'Object')) {
        //   dispatch(actionCreator.fn(e, actionCreator.key))
        // } else {
        //   dispatch(actionCreator.request.fn(e, actionCreator.request.key))

        //   // don't know what this last line was for before 
        //   // most recent revision. 
        //   // await dispatch(actionCreator(e))
        // }
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