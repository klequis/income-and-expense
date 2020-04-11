import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import { useFinanceContext } from 'financeContext'
import { withRouter } from 'react-router-dom'
import removeLeadingSlash from 'lib/removeLeadingSlash'
// eslint-disable-next-line
import { green } from 'logger'


const useStyles = makeStyles({
  nav: {
    paddingBottom: 24
  },
  loggedin: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  userNickname: {
    fontSize: 32
  }
})



const Nav = ({ location }) => {

  const { importDataRequest } = useFinanceContext()
  const classes = useStyles()

  const { pathname } = location
  const _currentViewName = removeLeadingSlash(pathname)

  return (
    <div className={classes.nav}>
      <Button variant="outlined" onClick={() => importDataRequest(_currentViewName)}>
        Import Data
      </Button>
    </div>
  )
}

export default withRouter(Nav)
