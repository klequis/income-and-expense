

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
import InfiniteScroll from "react-infinite-scroll-component";

import {
  views
  // duplicateStatus
} from 'global-constants'
// import * as Promise from 'bluebird'
import View from './View'

// eslint-disable-next-line
import { green, red, yellow, orange, logRender } from 'logger'
import * as R from 'ramda'

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
  const [_viewDataLength, _setViewDataLength] = useState(100)
  const [_hasMore, _setHasMore] = useState(true)


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
  useEffect(() => {
    _setViewDataLength(_viewData.length)
  }, [_viewDataLength])
  
  
  // const _viewData = () => {
    
  //   const data = useSelector(state => state.viewData)
  //   const r = R.take(_viewDataLength, data)
  //   green("take", r)
  //   return r
  // }
  // green('_loading', _loading)
  // green('viewReadKey', actionIsPending(actionKeys.viewReadKey))
  // green('rulesReadKey', actionIsPending(actionKeys.rulesReadKey))

  if (_loading && (actionIsPending(actionKeys.viewReadKey) || actionIsPending(actionKeys.rulesReadKey))) {
    green('LOADING')
    return <h1>Loading</h1>
  }


  const getMore = () => {
    _setViewDataLength(_viewDataLength + 200)
  }

  // return <View />
  return (
    <div>
      {logRender('Container')}
      <InfiniteScroll
        dataLength={_viewDataLength}
        next={getMore}
        hasMore={_hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>All records displayed.</p>}
      >
        <View data={R.take(_viewDataLength, _viewData)} />
      </InfiniteScroll>
    </div>
  )
}

export default Container
