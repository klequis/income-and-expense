import React from 'react'
import MuiSelect from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/styles'
// eslint-disable-next-line
import { green, redf } from 'logger'

const useStyles = makeStyles({
  root: {
    fontSize: 14,
    // color: 'green'
  },
  select: {
    marginRight: 20
  }
})

const Select = ({ name, value, onChange, children }) => {
  const classes = useStyles()
  return (
    <MuiSelect
    className={classes.select}
      name={name}
      value={value}
      onChange={onChange}
      classes={{
        root: classes.root,
      }}
    >
      {children}
    </MuiSelect>
  )
}

export default Select
