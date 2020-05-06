There a two types of actions

Object

```js
const rulesReadAction = {
  fn: (data) => ({
    type: actionKeys.rulesReadKey,
    payload: data
  }),
  key: actionKeys.rulesReadKey
}
```
- fn<function>: a function that returns an action creator
- key<string>: a unique identifier for the action creator


Thunk Function

```js
export const rulesReadRequestAction = createRequestThunk({
  request: {
    fn: api.rules.read,
    key: actionKeys.rulesReadRequestKey
  },
  success: [rulesReadAction] // optional
  failure: [] // optional
})
```

- request: <object>
  - request.fn: <func>
  - request.key <string>
- success: [
  <object>{fn: <object>, key: <string>} &&/|| <func>]
- failure: [<object> &&/|| <func>]

Therefore

- request is always an object
- success & failure can be <object> &/or <func>
  - if <object> it will have
    fn<func>: a function that returns an action creator
    key<string>: a unique key for the above action creator
  - if <func> it will be another Thunk Function

Use Case: Thunk function has thunk function as success

- for each success
  - if <object> than use obj.fn, obj.key
  - if <func> then use request.fn, request.key



