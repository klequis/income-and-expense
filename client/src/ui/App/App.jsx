

import React from 'react'
import DevTools from 'ui/DevTools'
import { Route, Switch, Link } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import Nav from 'ui/Nav'
import AllDataByDescription from 'ui/views/AllDataByDescription'
import AmountByCategory from 'ui/views/AmountByCategory'
import RawData from 'ui/views/RawData'
import { views } from 'global-constants'
import DuplicateStatus from 'ui/DuplicateStatus'
import Duplicates from 'ui/views/Duplicates'
import Infinite from 'ui/views/Infinite'
// import { PageProvider } from 'pageContext'

// eslint-disable-next-line
import { green, red, orange, logRender } from 'logger'

const useStyles = makeStyles({
  appTitle: {
    fontSize: 48,
    paddingTop: 32,
    paddingBottom: 32
  },
  devWrapper: {
    display: 'flex',
    alignItems: 'stretch'
  },
  navDiv: {
    display: 'flex'
  }
})

const App = () => {
  const _classes = useStyles()

  return (
    <div className={_classes.devWrapper}>
      {logRender('App')}
      <Container maxWidth={false}>
        <div className={_classes.navDiv}>
          <Nav />
          <Link to={`/${views.infinite}`}>
            <Button variant="contained">Infinite</Button>
          </Link>
          <Link to={`/${views.allDataByDescription}`}>
            <Button variant="contained">All Data</Button>
          </Link>
          <Link to={`/${views.amountByCategory}`}>
            <Button variant="contained">Amount by Category</Button>
          </Link>
          <Link to={`/${views.rawData}`}>
            <Button variant="contained">Raw Data</Button>
          </Link>
          <Link to={`/${views.duplicates}`}>
            <Button variant="contained">Duplicates</Button>
          </Link>
          
        </div>
        
        <DuplicateStatus />
        <Infinite />
        {/* <PageProvider> */}
          {/* <Switch>
            <Route exact path={`/${views.allDataByDescription}`}>
              <AllDataByDescription />
            </Route>
            <Route exact path={`/${views.amountByCategory}`}>
              <AmountByCategory />
            </Route>
            <Route exact path={`/${views.rawData}`}>
              <RawData />
            </Route>
            <Route exact paht={`/${views.duplicates}`}>
              <Duplicates />
            </Route>
            <Route exact paht={`/${views.infinite}`}>
              <Infinite />
            </Route>
          </Switch> */}
        {/* </PageProvider> */}
      </Container>
      {process.NODE_ENV !== 'production' ? <DevTools /> : null}
    </div>
  )
}

export default App
