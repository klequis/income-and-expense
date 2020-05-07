import React, { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'
import { useAppContext } from 'appContext'
import useActionsPending from 'useActionsPending'

import {
  views
  // duplicateStatus
} from 'global-constants'
// import * as Promise from 'bluebird'
import View from './View'

// eslint-disable-next-line
import { green, red, yellow, orange } from 'logger'

// const useAreRequestsPending = () => {
//   const requests = useSelector((state) => state.requests)
//   return Object.keys(requests).some((key) => requests[key].status === 'pending')
// }

const Container = () => {
  // Actions
  const {
    refreshRulesAndView,
    actionKeys
  } = useAppContext()

  const {
    actionIsPending
  } = useActionsPending()

  // State

  const [_loading, _setLoading] = useState(true)

  // Effects

  useEffect(() => {
    _setLoading(true)
    ;(async () => {
      await refreshRulesAndView(views.allDataByDescription)
      _setLoading(false)
    })()
    
    // eslint-disable-next-line
  }, [])

  // green('_loading', _loading)
  // green('viewReadKey', actionIsPending(actionKeys.viewReadKey))
  // green('rulesReadKey', actionIsPending(actionKeys.rulesReadKey))

  if (_loading && (actionIsPending(actionKeys.viewReadKey) || actionIsPending(actionKeys.rulesReadKey))) {
    green('LOADING')
    return <h1>Loading</h1>
  }

  // return <View />
  return (
    <div>
      {orange('*Container render')}
      <View />
    </div>
  )
}

export default Container
