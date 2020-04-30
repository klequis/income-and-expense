import React, { useCallback, useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'
import { useFinanceContext } from 'financeContext'
import useRequestPendingCount from 'useRequestPendingCount'

import {
  views
  // duplicateStatus
} from 'global-constants'
import * as Promise from 'bluebird'
import View from './View'

// eslint-disable-next-line
import { green, red, yellow } from 'logger'

// const useAreRequestsPending = () => {
//   const requests = useSelector((state) => state.requests)
//   return Object.keys(requests).some((key) => requests[key].status === 'pending')
// }

const Container = () => {
  // Actions
  const {
    rulesReadRequest,
    viewReadRequest,
    currentViewNameSet,
  } = useFinanceContext()

  // State

  const [_loading, _setLoading] = useState(true)

  const _updateRulesAndView = useCallback(async () => {
    await rulesReadRequest()
    await viewReadRequest(views.allDataByDescription)
  }, [rulesReadRequest, viewReadRequest])

  // Effects

  useEffect(() => {
    _setLoading(true)
    ;(async () => {
      const result = await Promise.all([
        rulesReadRequest(),
        viewReadRequest(views.allDataByDescription)
      ])
      currentViewNameSet(views.allDataByDescription)
      _setLoading(false)
    })()
    
    // eslint-disable-next-line
  }, [currentViewNameSet])

  // Methods

  // const requests = useSelector((state) => state.requests)
  // red('requests', requests)
  // const requestsPending = Object.keys(requests).some(
  //   (key) => requests[key].status === 'REQUEST_PENDING'
  // )

  // if (_data.length === 0) {
  //   return <h1>Getting data</h1>
  // }
  // red('requestsPending', requestsPending)
  red('_loading', _loading)
  red('requestPendingCount', useRequestPendingCount())
  if (useRequestPendingCount() > 0 || _loading) {
    return <h1>Getting data</h1>
  }

  return <View />
}

export default Container
