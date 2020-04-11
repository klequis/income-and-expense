import React from 'react'
import MuiTextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/styles'
// eslint-disable-next-line
import { green, redf } from 'logger'

const useStyles = makeStyles({
  root: {
    fontSize: 14,
    // color: 'green'
  },
  textField: {
    marginRight:  20
  }
})

const TextField = ({
  className,
  name,
  label,
  value,
  onChange,
  fullWidth = false
}) => {
  const classes = useStyles()
  return (
    <MuiTextField
      className={classes.textField}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      fullWidth={fullWidth}
      // classes={{
      //   root: classes.root
      // }}
      InputProps={{
        classes: {
          root: classes.root
        }
      }}
    />
  )
}

export default TextField
