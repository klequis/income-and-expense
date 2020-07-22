// 1. I took out paging and view receives data via prop now
//    - Nope, no page refresh :)
// 1. Test if still have the refresh problem
// 3. Investigate expanding upon use of Bluebird in other cases similar to refreshRulesAndView
// 4. Read-up on pure component



// - Container useEffect -> refreshRulesAndView
// - Container ifLoading
// - Container renderView
// - View useEffect -> init -> _setData
// - View renderTR
// - TR renderRules
// - Rules renderRule
// - Rule _deleteClick -> updateRulesAndView

// updateRulesAndView
// - Rule._deleteClick

// refreshRulesAndView

import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppContext } from 'appContext'
import useActionsPending from 'useActionsPending'

import {
  views
  // duplicateStatus
} from 'global-constants'
// import * as Promise from 'bluebird'
import View from './View'

// eslint-disable-next-line
import { green, red, yellow, orange, logRender } from 'logger'

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

  const _viewData = useSelector(state => state.viewData)

  if (_loading && (actionIsPending(actionKeys.viewReadKey) || actionIsPending(actionKeys.rulesReadKey))) {
    green('LOADING')
    return <h1>Loading</h1>
  }



  // return <View />
  return (
    <div>
      {logRender('Container')}
      <View data={_viewData} />
    </div>
  )
}

export default Container
