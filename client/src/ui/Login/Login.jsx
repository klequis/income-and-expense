import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useAuth0 } from 'react-auth0-spa'
import { setUser } from 'store/user/actions'
import { getUserId } from 'store/user/selectors'
import Button from '@material-ui/core/Button'
// import { green } from 'logger'

const Login = ({ setUser }) => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()

  useEffect(() => {
    if (isAuthenticated) {
      const { 'https://klequis-todo.tk/uuid': uid } = user
      setUser(uid)
    }
  }, [isAuthenticated, user, setUser])

  const handleLoginClick = () => {
    loginWithRedirect({})
  }
  const handleLogoutClick = () => {
    logout({
      returnTo: window.location.origin
    })
  }

  return (
    <>
      {isAuthenticated ? (
        <div>
          <Button onClick={handleLogoutClick} variant="outlined">
            Logout
          </Button>
        </div>
      ) : (
        <div>
          <h2>To see your todos ...</h2>
          <Button onClick={handleLoginClick} variant="outlined">
            Login
          </Button>
        </div>
      )}
    </>
  )
}

const mstp = state => {
  return {
    userId: getUserId(state)
  }
}

const actions = { setUser }

export default connect(mstp, actions)(Login)
