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
['!good 3', '!good 4']
```

I tried this. Not sure you can pass a function as the accumulator

```js
R.reduce(include, x => R.append(x, []), res)

// -> false
```






