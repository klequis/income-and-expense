// eslint-disable-next-line
import {
  requestPendingAction,
  requestSuccessAction,
  requestFailedAction
} from './requests/actions'
// import { useFinanceContext } from 'financeContext'

// eslint-disable-next-line
import { pink, red } from 'logger'

export const logError = (err, key) => {
  red(`actions.logError(key:${key})`, err)
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
  return (...args) => async dispatch => {
    // pink('args', args)
    const requestKey = typeof key === 'function' ? key(...args) : key
    // pink('requestKey', requestKey)
    start.map(async actionCreator => {
      await dispatch(actionCreator())
    })
    await dispatch(requestPendingAction(requestKey))
    
    try {
      const data = await request(...args)
      await dispatch(requestSuccessAction(requestKey))
      success.map(async actionCreator => {
        // pink('success.actionCreator', actionCreator)
        dispatch(requestSuccessAction(requestKey))
        // pink('success: data', data)
        await dispatch(actionCreator(data))
      })
    } catch (e) {
      await dispatch(requestFailedAction(e, requestKey))
      return failure.map(async actionCreator => {
        // pink('failure.actionCreator', actionCreator)
        red('action.helpers.createRequestThunk Error', e.message)
        console.log(e)
        dispatch(requestFailedAction(e, requestKey))
        await dispatch(actionCreator(e))
      })
    }
  }
}

// Promise
// export const createRequestThunk = ({
//   request,
//   key,
//   start = [],
//   success = [],
//   failure = []
// }) => {
//   return (...args) => dispatch => {
//     const requestKey = typeof key === 'function' ? key(...args) : key
//     start.forEach(actionCreator => dispatch(actionCreator()))
//     dispatch(requestPending(requestKey))

//     return request(...args)
//       .then(data => {
//         success.forEach(actionCreator => dispatch(actionCreator(data)))
//         dispatch(requestSuccess(requestKey))
//       })
//       .catch(reason => {
//         failure.forEach(actionCreator => {
//           pink('failure.actionCreator', actionCreator)
//           dispatch(actionCreator(reason))
//         })
//         dispatch(requestFailed(reason, requestKey))
//       })
//   }
// }

// ORIG
// export const createRequestThunk = ({
//   request,
//   key,
//   start = [],
//   success = [],
//   failure = []
// }) => {
//   return (...args) => async dispatch => {
//     const requestKey = typeof key === 'function' ? key(...args) : key
//     start.map(async actionCreator => {
//       await dispatch(actionCreator())
//     })
//     await dispatch(requestPending(requestKey))
//     try {
//       const data = await request(...args)
//       await dispatch(requestSuccess(requestKey))
//       success.map(async actionCreator => {
//         await dispatch(actionCreator(data))
//         dispatch(requestSuccess(requestKey))
//       })
//     } catch (e) {

//       await dispatch(requestFailed(e, requestKey))
//       failure.map(async actionCreator => {
//         await dispatch(actionCreator(e))
//         dispatch(requestFailed(e, requestKey))
//       })
//     }
//   }
// }
