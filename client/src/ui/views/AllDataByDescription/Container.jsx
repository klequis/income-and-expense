import React, { useCallback, useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'
import { useAppContext } from 'appContext'
import useActionsPending from 'useActionsPending'

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
    actionKeys
  } = useAppContext()

  const {
    actionIsPending
  } = useActionsPending()

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

  green('viewReadKey', actionIsPending(actionKeys.viewReadKey))
  green('rulesReadKey', actionIsPending(actionKeys.rulesReadKey))

  return <View />
}

export default Container
