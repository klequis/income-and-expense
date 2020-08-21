import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { useAppContext } from 'appContext'
import * as R from 'ramda'

// eslint-disable-next-line
import { green, red } from 'logger'

const _hasOmitRule = (rule) => {
  const { actions } = rule
  return R.find(R.propEq('action', 'omit'))(actions) !== undefined
}

const ThisDateOnly = ({ rule }) => {
  const [_hasOmit, _setHasOmit] = useState(null)

  if (_hasOmit === null) {
    return null
  }

  return (
    <FormControlLabel
      control={<Switch checked={_hasOmit} value="omit" />}
      label="Omit"
    />
  )
}

export default ThisDateOnly
