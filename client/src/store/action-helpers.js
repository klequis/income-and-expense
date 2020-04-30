// eslint-disable-next-line
import {
  requestPendingCountIncrementAction,
  requestPendingCountDecrementAction,
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
  key,
  start = [],
  success = [],
  failure = []
}) => {
  // console.group('createRequestThunk')
  // pink('key', key)
  // pink('request', request)
  // pink('success', success)
  // console.groupEnd()
  return (...args) => async (dispatch) => {
    // pink('args', args)
    const requestKey = typeof key === 'function' ? key(...args) : key
    // I never use start
    // start.map(async (actionCreator) => {
    //   await dispatch(actionCreator())
    // })
    await dispatch(requestPendingAction(requestKey))
    await dispatch(requestPendingCountIncrementAction(requestKey))

    try {
      pink('requesting', requestKey)
      const data = await request(...args)
      pink('returned', requestKey)
      await dispatch(requestSuccessAction(requestKey))
      success.map(async (actionCreator) => {
        pink('dispatching', getKeyFromFunction(actionCreator.toString()))
        await dispatch(actionCreator(data))
        pink('done', getKeyFromFunction(actionCreator.toString()))
        dispatch(requestPendingCountDecrementAction(requestKey))
      })
    } catch (e) {
      await dispatch(requestFailedAction(e, requestKey))
      return failure.map(async (actionCreator) => {
        red('action.helpers.createRequestThunk Error', e.message)
        console.log(e)
        dispatch(requestFailedAction(e, requestKey))
        await dispatch(actionCreator(e))
      })
    }
  }
}