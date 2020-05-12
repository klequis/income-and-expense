# Rule Checker

## Criteria

field

- description
- type
- credit
- debit
- acctId
- date

operation

- beginsWith
- contains
- doesNotContain
- equals
- regex

value

- not empty

## pseudo code

Criteria: check `field`

```js
`field` is oneOf['list of fields']


```

Criteria: check `operation`

```js

`operation` oneOf['list of operations']

```

Criteria: check `value`

```js

select (field)
  case 'description'
    isString(criteria.value) === true
  case 'type'
    isString(criteria.value) === true
  case 'credit'
    (isNumber(criteria.value) && isPositive(criteria.value)) === true
  case 'debit'
    (isNumber(criteria.value) && isNegative(criteria.value)) === true
  case 'acctId'
    [criteria.value].oneOf['list of account ids']
  case 'date'
    isIsoDateString(criteria.value) === true
```

## actions

action

- categorize
- omit
- replaceAll
- strip

field

- omit
  - no additional fields
- strip
  - field
  - findValue
  - numAdditionalChars
- replaceAll
  - field
  - replaceWithValue
- categorize
  - category1
  - category2

## Actions

Actions: check `action`

```js
oneOf['list of actions']
```

All other action fields depend upon what the actions is

```js
select (action)
  case 'categorize'
    isString(category1) === true
  case 'omit'
    // no additional fields
  case 'replaceAll'
    field === 'description'
    isString(replaceWithValue)
  case 'strip'
    isString(findValue)
    isNumber(numAdditionalChars)
```

## Error Shape

```js
[
  {
    _id: ObjectId('some object id'),
    criteria: [
      field: R.contains(propertyValue, ['list of fields']),
      operation: R.contains(propertyValue, ['list of operators']),,
      value: (R.type(propertyValue) === 'String' && ),
      errors: [
        `${value} is not a valid value for property: field`,
        `${value} is not a valid value for property: operation`,
      ]
    ],
    actions: [
      action: R.contains(propertValue, ['list of actions']),
      field: R.contains(propertyValue, ['some list of fields']),
      findValue: isString(propertyValue),
      numAdditionalChars: isNumber(propertyValue),
      replaceWithValue: isString(propertyValue),
      category1: isString(propertyValue),
      category2: isString(propertyValue),
      errors: [
        `some error`,
        `another error`
      ]
    ]
  }
]
```

I want to create an object where each property is a function that check the property of the same name with a function.

Ex.

```js
const person = {
  name: 'joe'
  age: 25
}
```

Maybe it needs to be a function

```js
const personCheck = {
  name: isString(name),
  age: isNumber(age)
}
```

Maybe

```js
const personCheck = (person) => {
  // could create an object that is testable
  name: isString()(name)
  age: isNumber()(name)
}
```

Or

for each prop in person

- get its value
- run the corresponding function in personCheck

```js
const personCheck = person => {
  const check = {
    name: isString()(name)
    age: isNumber()(name)
  }
}

R.map()

```

# Question

I want to check that each property value of an object meets one or more tests. For the moment, this only needs to work on flat objects.

Say I have an object

```js
const person = {
  name: 'joe',
  age: '25'
}
```

And an object that holds the tests

```js
const personCheck = {
  name: R.type(value) === 'String'
  age: R.type(value) === 'Number' && value <= 30
}
```

My try so far

```js
```

I have an array of objects

```js
const res = [
  { result: true, message: 'good 1' },
  { result: true, message: 'good 2' },
  { result: false, message: '!good 3' },
  { result: false, message: '!good 4' }
]
```

I want to collect all the message prop values where `result` is false. Think there is a way to do with reduce but I don't know how to append to the accumulator.

Desired result

```js
;['!good 3', '!good 4']
```

I tried this. Not sure you can pass a function as the accumulator

```js
R.reduce(include, (x) => R.append(x, []), res)

// -> false
```

# Rule Checker

- For the rule, only a check for presence & type of required props is needed
- For actions and criteria, a check of form and presence & type is needed

## Rule

### Rule props check

```js
const ruleSpec = {
  _id: isString,
  isNotEmpty,
  criteria: isArray,
  isNotEmpty,
  actions: isArray,
  isNotEmpty
}
```

## Actions

### Action form check

```js
if action === 'categorize'
  hasProps(['category1'])

if action === 'omit'
  // no other props required

if action === 'replaceAll'
  hasProps([field, replaceWithVaue])

if action === 'strip'
  hasProps([findValue, numAdditionalChars])

```

### Action prop check

```js
const actionSpec = {
  action: [isString, isAction],
  field: [isString, or([isEqualTo('description'), isEqualTo('')])],
  findValue: [isString],
  numAdditionalChars: [isNumber],
  replaceWithValue: [isString],
  category1: [isString],
  category2: [isString]
}
```

## Criteria

### Criteria form check

```js
if operation ===
  field: isString, isNotEmpty
  value: isString, isNotEmpty

if operation ===
  field: isString, isNotEmpty
  value: isString, isNotEmpty

if operation === isOneOf(['beginsWith', 'contains', 'doesNotContain' ])
  field: isString, isNotEmpty
  value: isString, isNotEmpty

if operation === 'equals'
  field: isString, isNotEmpty
  value: or([isString, isNumber], isNotEmpty
```

### Criteria props check

////////////////////////////////////////////////////////////////

Think again

strip && regex

so I need isString and isStringWithMessage YUK!!

So I have to check the props of the rule

Then I need to check the props of the action

- only need to check props that exist for a given action type

- so it will be something like
  if the action === 'actionName'
  -> check these properties ['prop1', 'prop2']

The prop check could go off of a propSpec object

- would I have on large prop spec object or on for actions and one for criteria
- seems safer to do the latter

SO

```js
ruleCheck =bb rule  =>

  - check-Rule-Shape
    - hasProp('_id')
    - hasProp('criteria')
    - hasProp('actions')

  - check-Rule-PropValues
    - type(prop('_id')) === 'String'
    - type(prop('criteria')) === 'Array'
    - type(prop('actions')) === 'Array'

  - check-Criteria-Shape
    - hasProp('field')
    - hasProp('operation')
    - hasProp('value')

  - check-Criteria-PropValues
    - noPropsEmpty(criteria)
    - operator(oneOf(['beginsWith', 'contains', 'doesNotContain', 'equals' ]))
    - if prop('field') === 'description'
      - prop('value'): isString, isNotEmpty
      - prop('operation': isOneOf)
    - if prop('field') === 'type'  // future: limit to known types
      - prop('value'): isString, isNotEmpty
    - if prop('field') === 'credit'
      - prop('value'): isNumber
    - if prop('field') === 'debit'
      - prop('value'): isNumber
    - if prop('field') === 'debit'
      - prop('value'): isNumber
    - if prop('field') === 'acctId'
      - prop('value'): isString, isNotEmpty
    - if prop('field') === 'date'
      - prop('value'): isDate

  - check-Action-Shape // depends on the action type
    - hasProp('action') // always
    if prop('action') === 'omit'
      // no other fields required
    if prop('action') === 'strip'
      - hasProp('findValue')
      - hasProp('numAdditionalChars')
    if prop('action') === 'replaceAll'
      - hasProp('field')
      - hasProp('replaceWithValue')
    if prop('action') === 'categorize'
      - hasProp('category1')
      - hasProp('category2', 'optional')

  - check-Action-PropValues
    - oneOf(prop('action'), ['omit', 'strip', 'replaceAll', 'categorize']) // always
    if prop('action') === 'omit'
      // no other fields required
    if prop('action') === 'strip'
      - prop('findValue'): isString, isNotEmpty
      - prop('numAdditionalChars'): isNumber
    if prop('action') === 'replaceAll'
      - prop('field'): isEqualTo('description')
      - prop('replaceWithValue'): isString, isNotEmpty
    if prop('action') === 'categorize'
      - prop('category1'): isString, isNotEmpty
      - prop('category2', 'optional'): isString


  // FORGET THIS
  - checkBOTH // depends on the action type
    - hasProp('action') // always
    if prop('action') === 'omit'
      // no other fields required

    if prop('action') === 'strip'
      - hasProp('findValue')
        - prop('findValue'): isString, isNotEmpty
      - hasProp('numAdditionalChars')
        - prop('numAdditionalChars'): isNumber

    if prop('action') === 'replaceAll'
      - hasProp('field')
        - prop('field'): isEqualTo('description')
      - hasProp('replaceWithValue')
        - prop('replaceWithValue'): isString, isNotEmpty

    if prop('action') === 'categorize'
      - hasProp('category1')
        - prop('category1'): isString, isNotEmpty
        - prop('category2', 'optional'): isString
      - hasProp('category2', 'optional')
        - prop('category2', 'optional'): isString
```

Use of pipe

```js
R.pipe(
  R.when(
    R.propSatisfies(R.eq(R.__, 'categorize'), prop('action')),
    R.pipe(
      R.append(isString),
      R.append(isNotEmpty),
      R.append(isOneOf(['a', 'b']))
    )
  )
)(actions)
```