import React from 'react'
import { makeStyles } from '@material-ui/styles'
import classNames from 'classnames'

// eslint-disable-next-line
import { green } from 'logger'

const useStyles = makeStyles({
  td: {
    padding: '5px',
    maxWidth: 500
  },
  right: {
    textAlign: 'right'
  },
  left: {
    textAlign: 'left'
  }
})

const TD = ({ align, children }) => {
  const classes = useStyles()
  const modClasses = classNames([classes.td], {
    [classes.right]: align === 'right',
    [classes.left]: align === 'left'
  })

  return <td className={modClasses}>{children}</td>
}

export default TD
