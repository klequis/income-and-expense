import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MenuItem from '@material-ui/core/MenuItem'
import Select from 'ui/elements/Select'
import ActionControls from './ActionControls'
import ActionButton, { buttonTypes } from 'ui/elements/ActionButton'
import { makeStyles } from '@material-ui/styles'
import { mergeRight } from 'ramda'

// eslint-disable-next-line
import { green, redf } from 'logger'

const useStyles = makeStyles({
  editModeWrapper: {
    padding: '4px 8px',
    display: 'flex',
    alignItems: 'flex-end'
  },
  notEditModeWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  notEditModeField: {
    marginRight: 20
  }
})

const ActionEdit = ({
  action: Action,
  actionRemove,
  handleDirtyChange,
  handleActionChange
}) => {
  const {
    _id,
    action = '',
    field = '',
    findValue = '',
    numAdditionalChars = '',
    replaceWithValue = '',
    category1 = '',
    category2 = ''
  } = Action

  const [_values, _setValues] = useState({
    _id: _id,
    action: action,
    field: field,
    findValue: findValue,
    numAdditionalChars: numAdditionalChars,
    replaceWithValue: replaceWithValue,
    category1: category1,
    category2: category2
  })

  const _classes = useStyles()

  const _actionRemove = () => {
    actionRemove(_id)
  }

  const _handleChange = event => {
    const { name, value } = event.target
    const newValues = mergeRight(_values, { [name]: value })
    _setValues(newValues)
    handleDirtyChange(true) 
    handleActionChange(newValues)
  }

  return (
    <div key={_id} className={_classes.wrapper}>
      <div className={_classes.editModeWrapper}>
        <Select name="action" value={_values.action} onChange={_handleChange}>
          <MenuItem value="omit">Omit</MenuItem>
          <MenuItem value="strip">Strip</MenuItem>
          <MenuItem value="replaceAll">Replace all</MenuItem>
          <MenuItem value="categorize">Categorize</MenuItem>
        </Select>
        <ActionControls values={_values} handleChange={_handleChange} />
        <ActionButton buttonType={buttonTypes.remove} onClick={_actionRemove} />
      </div>
    </div>
  )
}

export default ActionEdit

ActionEdit.propTypes = {
  Action: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    field: PropTypes.string,
    findValue: PropTypes.string,
    numAdditionalChars: PropTypes.number,
    replaceWithValue: PropTypes.string,
    category1: PropTypes.string,
    category2: PropTypes.string
  }),
  handleDirtyChange: PropTypes.func.isRequired,
  handleActionChange: PropTypes.func.isRequired
}
