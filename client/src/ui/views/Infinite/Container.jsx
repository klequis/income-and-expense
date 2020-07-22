
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppContext } from 'appContext'
import useActionsPending from 'useActionsPending'

import {
  views
} from 'global-constants'
import Infinite from './Infinite'

// eslint-disable-next-line
import { green, red, yellow, orange, logRender } from 'logger'

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

  const _viewData = useSelector(state => state.viewData)
  if (_viewData.length === 0) {
    return <h1>Loading</h1>
  }
  green('_viewData.length', _viewData.length)
  if (_loading && (
      actionIsPending(actionKeys.viewReadKey) || actionIsPending(actionKeys.rulesReadKey))
    ) {
    green('LOADING')
    return <h1>Loading</h1>
  }


  green('container')
  // return <View />
  return (
    <div>
      {logRender('Container')}
      <Infinite data={_viewData} />
    </div>
  )
}

export default Container
