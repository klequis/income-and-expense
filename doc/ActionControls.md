# ActionControls

#### Functions
- none

#### Props
- values
- handleChange

#### Actions
- none

#### State
- none

#### Local Vars
_from values_
- action
- field
- findValue
- numAdditionalChars
- replaceWithValue
- category1
- category2

#### Methods
- none

#### Renders

**action === 'omit'**
```js
return null
```

**action = 'strip'**
```js
- <Select field> // (Description | Type)
- <TextField> // findValue
- <TextField> // numAdditionalChars
```

**action === 'replaceAll'**
```js
- <Select field> // (Description | Type)
- <TextField> // replaceWithValue
```
**action === 'categorize'**
```js
- <TextField> // category1
- <TextField> // category2
```

