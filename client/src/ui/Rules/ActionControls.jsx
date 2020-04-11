import React from 'react'
import TextField from 'ui/elements/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from 'ui/elements/Select'
import { dataFieldsZZ, actionTypes } from 'global-constants'

// eslint-disable-next-line
import { green, redf } from 'logger'

const ActionControls = ({ values, handleChange }) => {
  const {
    action = '',
    field = '',
    findValue = '',
    numAdditionalChars = '',
    replaceWithValue = '',
    category1 = '',
    category2 = ''
  } = values

  if (action === actionTypes.omit || action === '') {
    return null
  }
  if (action === actionTypes.strip) {
    return (
      <>
        <Select name="field" value={field} onChange={handleChange}>
          <MenuItem value={dataFieldsZZ.description}>Description</MenuItem>
          <MenuItem value={dataFieldsZZ.type}>Type</MenuItem>
        </Select>
        <TextField name="findValue" label="findValue" value={findValue} />
        <TextField
          name="numAdditionalChars"
          label="numAdditionalChars"
          value={numAdditionalChars}
        />
      </>
    )
  }
  if (action === actionTypes.replaceAll) {
    return (
      <>
        <Select name="field" value={field} onChange={handleChange}>
          <MenuItem value={dataFieldsZZ.description}>Description</MenuItem>
          <MenuItem value={dataFieldsZZ.type}>Type</MenuItem>
        </Select>
        <TextField
          name="replaceWithValue"
          label="replace with"
          value={replaceWithValue}
          onChange={handleChange}
        />
      </>
    )
  }
  if (action === actionTypes.categorize) {
    return (
      <>
        <TextField
          id={`category1`}
          name="category1"
          label="category1"
          value={category1}
          onChange={handleChange}
        />
        <TextField
          id={`category2`}
          name="category2"
          label="category2"
          value={category2}
          onChange={handleChange}
        />
      </>
    )
  }
  redf('Rule.ActionControls ERROR:', `unknown action ${action}`)
  return null
}

export default ActionControls
