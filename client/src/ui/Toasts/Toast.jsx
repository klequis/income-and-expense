import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withStyles from 'react-jss'
import classNames from 'classnames'
import { clearToast } from 'store/toast/actions'
import { getToast } from 'store/toast/selectors'
import { TOAST_WARN, TOAST_INFO } from 'global-constants'
// eslint-disable-next-line
import { green } from 'logger'

const Toast = ({ classes, toast }) => {
  useEffect(() => {
    const timerId = setTimeout(() => clearToast(), 3000)
    return () => clearTimeout(timerId)
  })

  if (!toast) {
    return null
  }

  const { level, id, message, error } = toast

  return (
    <div key={id}>
      <h1>{message}</h1>
      <b>{error.statusText}</b>
    </div>
  )
}

const actions = { clearToast }

const mstp = state => {
  return {
    toast: getToast(state)
  }
}

export default compose(connect(mstp, actions))(Toast)
