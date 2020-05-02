createRequestThunk({
  request: no change
  keys: [
    {
      VIEW_READ_REQUEST_KEY
    }
    
  ]
    
  
})


{
  requestActions: {
    fn: api.views.read,
    key: VIEW_READ_REQUEST_KEY
  },
  successActions: [
    {
      fn: viewReadAction,
      key: VIEW_READ_KEY
    }
  ]
  
  
}


Can an action be a function and a key

# Signatures

## Plain Action

```js
const somePlainAction = {
  fn: theActionFn()<func> { type<string>: 'THE_ACTION_FN', payload<any>: somePayload<any> }
  key: theActionKey<string>
}
```

## Thunk Action

```js
const someThunkAction = {
  fn: theThunkAction<func>()
  key: theThunkKey<string>
}
```

## A Thunk

```js
const someThunk = createRequestThunk({
  request: someThunkAction.fn<func>
  requestKey: someThunkAction.key<string>
  success: [ someSuccessFunction<func> ],
  failure: [ someFailureFunction<func> ]
}
```


# Example

```js
const viewReadAction = {
  fn: data => { type: actionKeys.viewReadKey, payload: data }
  key: actionKeys.viewReadKey
}

const viewReadRequestAction = {
  fn: api.views.read,
  key: actionKeys.viewReadRequestAction
}

const viewReadRequestAction = createRequestThunk({
  request: viewReadRequestAction.fn,
  requestKey: actionKeys.viewReadRequestAction
  success: [ viewReadAction ],
  failure: [ someFailureFunction ]
})
```

```js
const viewReadRequestAction = createRequestThunk({
  requests: [viewReadRequestAction],
  success: [ viewReadAction ],
  failure: [ someFailureFunction ]
})
```

```js
export const createRequestThunk = ({
  request,
  success = [],
  failure = []
}) => {
  return (...args) => async (dispatch) => {
    try {
      dispatch(requestPendingAction(request.key))
      dispatch(actionsPendingAdd(request.key))
      const data = await request(...args)
      dispatch(requestSuccessAction(request.key))
      success.map(async (actionCreator) => {
        dispatch(actionCreator(data))
        dispatch(actionsPendingRemove(request.key))
      })
    } catch (e) {
      dispatch(requestFailedAction(e, request.key))
      return failure.map(async (actionCreator) => {
        red('action.helpers.createRequestThunk Error', e.message)
        console.log(e)
        dispatch(requestFailedAction(e, request.key))
        await dispatch(actionCreator(e))
      })
    }
  }
}
```


























