import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import App from 'ui/App'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppProvider } from 'appContext'

const store = configureStore()

const renderApp = () => {
  render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <AppProvider>
              <Router>
                <App />
              </Router>
            </AppProvider>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </Provider>,
    document.getElementById('root')
  )
}

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('ui/App', renderApp)
}

renderApp()
