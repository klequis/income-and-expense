There are now 3 types of actions?

1. An async action.
2. A plain action that is used in the success or failure of an async action.
3. A plain action that is dispatched directly

```js
dispatch(action<func>(type, payload))
```

**Plain - direct**


```js
// action.type
// action.key
// action.fn
const dispatch = action => {

  if (action.type = 'plain-action') {
    log('dispatching', action.key)
    _dispatch(action.fn)
  } else {
    
  }
}
```

*if it is a function it is intercepted by `redux-thunk`, otherwise it goes straight to the store*






# New Store Proposal

Overall question: Can an action be a function and a key?

## Actions

There are 2 types of actions

**Plain Action**

```js
const somePlainAction = {
  fn: theActionFn()<func> { type<string>: 'THE_ACTION_FN', payload<any>: somePayload<any> }
  key: theActionKey<string>
}
```

**Async Action**

```js
const someThunkAction = {
  fn: theThunkAction<func>  // an async function typically api call
  key: theThunkKey<string>
}
```

## Thunks

A thunk is a is an object wrapped in dispatch() and has the following properties:

- request: a thunk action as described above
- success: an array of plain actions
- failure: an array of plain actions


```js
const someThunk = createRequestThunk({
  request: someThunkAction
  success: [ someSuccessFunction<func> ],
  failure: [ someFailureFunction<func> ]
}
```


## Example

**Plain action**

```js
const viewReadAction = {
  fn: data => ({ type: actionKeys.viewReadKey, payload: data })
  key: actionKeys.viewReadKey
}
```

**Thunk action**

```js
const viewReadRequestAction = {
  fn: api.views.read,
  key: actionKeys.viewReadRequestAction
}
```

**Thunk**

```js
const viewReadRequestAction = createRequestThunk({
  requests: [viewReadRequestAction],
  success: [ viewReadAction ],
  failure: [ someFailureFunction ]
})
```

## createRequestThunk modifications

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


























