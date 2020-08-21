import React from 'react'
import MuiMenuItem from '@material-ui/core/MenuItem'
// eslint-disable-next-line
import { green, redf } from 'logger'


const MenuItem = ({ value, children }) => {
  return (
    <MuiMenuItem
      value={value}
    >
      {children}
    </MuiMenuItem>
  )
}

export default MenuItem
