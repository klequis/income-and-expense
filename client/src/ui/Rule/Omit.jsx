import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { useAppContext } from 'appContext'
import * as R from 'ramda'

// eslint-disable-next-line
import { green, red } from 'logger'
import { ruleTmpActionCreateAction } from 'store/ruleTmp/actions'

const _hasOmitAction = (rule) => {
  const { actions } = rule
  return R.find(R.propEq('action', 'omit'))(actions) !== undefined
}

const addOmit = () => {

}

const removeOmit = (ruleTmpRemoveAction) => {

}



const Omit = ({ rule }) => {

  const [_hasOmit, _setHasOmit] = useState(_hasOmitAction(rule))

  const { ruleTmpAddNewAction, ruleTmpRemoveAction } = useAppContext

  if (_hasOmit === null) {
    return null
  }

  const switchChange = (event) => {
    if (event.target.checked) {
      addOmit(ruleTmpActionCreateAction)
    } else {
      removeOmit(ruleTmpRemoveAction)
    }
  }

  return (
    <FormControlLabel
      control={<Switch checked={_hasOmit} value="omit" onChange={switchChange} />}
      label="Omit"
    />
  )
}

export default Omit
