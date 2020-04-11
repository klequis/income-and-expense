import React from 'react'
import { useAuth0 } from 'react-auth0-spa'
import Todos from 'ui/Todos'
import Login from 'ui/Login'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  nav: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const App = () => {
  const { loading, isAuthenticated } = useAuth0()
  const classes = useStyles()
  if (loading) {
    return null
  }

  return (
    <Container maxWidth="md">
      <div className={classes.nav}>
        <Login />
      </div>
      {isAuthenticated ? <Todos /> : null}
    </Container>
  )
}

export default App
