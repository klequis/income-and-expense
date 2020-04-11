import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Select from 'ui/elements/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/styles'
import { operators, dataFieldsZZ } from 'global-constants'
import TextField from 'ui/elements/TextField'
import { mergeRight } from 'ramda'
import ActionButton, { buttonTypes } from 'ui/elements/ActionButton'

// eslint-disable-next-line
import { green, redf } from 'logger'

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    padding: '4px 8px'
  },
  field: {
    marginRight: 10
  },
  actions: {
    display: 'flex',
    alignItems: 'flex-end',
    marginLeft: 35
  },
  viewModeField: {
    marginRight: 20
  }
})

const CriterionEdit = ({
  criterion,
  criterionRemove,
  handleCriterionChange,
  handleDirtyChange
}) => {
  const { _id, field, operation, value } = criterion

  const [values, setValues] = useState({
    _id,
    field: field || dataFieldsZZ.description,
    operation: operation || operators.beginsWith,
    value
  })

  const _handleChange = event => {
    const { name, value } = event.target
    const newValues = mergeRight(values, { [name]: value })

    setValues(newValues)
    handleDirtyChange(true)
    handleCriterionChange(newValues)
  }

  const _classes = useStyles()

  const _criterionRemove = () => {
    criterionRemove(_id)
  }

  return (
    <div className={_classes.wrapper}>
      <div>
        <Select
          className={_classes.field}
          name="field"
          value={values.field}
          onChange={_handleChange}
        >
          <MenuItem value={dataFieldsZZ.description}>Description</MenuItem>
          <MenuItem value={dataFieldsZZ.type}>Type</MenuItem>
          <MenuItem value={dataFieldsZZ.credit}>Credit</MenuItem>
          <MenuItem value={dataFieldsZZ.debit}>Debit</MenuItem>
        </Select>

        <Select
          className={_classes.field}
          name="operation"
          value={values.operation}
          onChange={_handleChange}
        >
          <MenuItem value={operators.beginsWith}>Begins with</MenuItem>
          <MenuItem value={operators.contains}>Contains</MenuItem>
          <MenuItem value={operators.doesNotContain}>Does not contain</MenuItem>
          <MenuItem value={operators.equals}>Equals</MenuItem>
          <MenuItem value={operators.regex}>RegEx</MenuItem>
          <MenuItem value={operators.in}>In</MenuItem>
        </Select>
        <TextField
          className={_classes.field}
          name="value"
          label="value"
          value={values.value}
          onChange={_handleChange}
          fullWidth
        />
        <ActionButton
          buttonType={buttonTypes.remove}
          onClick={_criterionRemove}
        />
      </div>
    </div>
  )
}

export default CriterionEdit

CriterionEdit.propTypes = {
  criterion: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    operation: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })
}
