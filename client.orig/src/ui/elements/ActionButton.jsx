import React from 'react'
import PropTypes from 'prop-types'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import CancelIcon from '@material-ui/icons/Cancel'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import DoneIcon from '@material-ui/icons/Done'
import IconButton from '@material-ui/core/IconButton'
import SaveIcon from '@material-ui/icons/Save'
import RemoveIcon from '@material-ui/icons/Remove'

// eslint-disable-next-line
import { green, red } from 'logger'

export const buttonTypes = {
  add: 'addButton',
  cancel: 'cancelButton',
  delete: 'deleteButton',
  done: 'doneButton',
  edit: 'editButton',
  remove: 'removeButton',
  save: 'saveButton'
}

const Icon = ({ buttonType }) => {
  switch (buttonType) {
    case buttonTypes.add:
      return <AddIcon />
    case buttonTypes.cancel:
      return <CancelIcon />
    case buttonTypes.delete:
      return <DeleteForeverIcon />
    case buttonTypes.done:
      return <DoneIcon />
    case buttonTypes.edit:
      return <EditIcon />
    case buttonTypes.remove:
      return <RemoveIcon />
    case buttonTypes.save:
      return <SaveIcon />
    default:
      throw new Error(
        `ActionButton.Icon ERROR: unknown buttonType ${buttonType}`
      )
  }
}

const ActionButton = ({ buttonType, onClick, disabled }) => {
  return (
    <IconButton onClick={onClick} disabled={disabled}>
      <Icon buttonType={buttonType} />
    </IconButton>
  )
}

export default ActionButton

ActionButton.propTypes = {
  buttonType: PropTypes.oneOf([
    buttonTypes.add,
    buttonTypes.cancel,
    buttonTypes.delete,
    buttonTypes.done,
    buttonTypes.edit,
    buttonTypes.remove,
    buttonTypes.save
  ]).isRequired,
  onClick: PropTypes.func.isRequired
}
