import React, { useCallback, useContext } from 'react'
import {
  ruleTmpAddAction,
  ruleTmpUpdateAction,
  ruleTmpRemoveAction,
  rulesReadRequestAction,
  ruleCreateRequestAction,
  ruleDeleteRequestAction,
  ruleUpdateRequestAction
} from 'store/rules/actions'

import { viewReadRequestAction } from 'store/views/actions'
import { useDispatch } from 'react-redux'
import {
  criteriaTestClearAction,
  criteriaTestReadRequestAction
} from 'store/criteriaTest/actions'
import { importDataRequestAction } from 'store/import/actions'
import {
  requestPendingAction,
  requestFailedAction,
  requestSuccessAction
} from 'store/requests/actions'
import {
  rowIdShowClearAction,
  rowIdShowSetAction,
  currentViewNameClearAction,
  currentViewNameSetAction
} from 'store/ui/actions'
// import * as Promise from 'bluebird'

import isNilOrEmpty from 'lib/isNilOrEmpty'

// eslint-disable-next-line
import { red, blue } from 'logger'

const MODULE_NAME = 'financeContext'

export const FinanceContext = React.createContext()
export const useFinanceContext = () => useContext(FinanceContext)

export const FinanceProvider = ({ children }) => {
  const dispatch = useDispatch()

  // C
  const criteriaTestClear = () => {
    dispatch(criteriaTestClearAction())
  }

  const criteriaTestReadRequest = useCallback(
    async criteria => {
      dispatch(await criteriaTestReadRequestAction(criteria))
    },
    [dispatch]
  )

  const currentViewNameClear = () => {
    dispatch(currentViewNameClearAction())
  }

  const currentViewNameSet = viewName => {
    dispatch(currentViewNameSetAction(viewName))
  }

  // I
  const importDataRequest = useCallback(
    async currentViewName => {
      dispatch(await importDataRequestAction()).then(async () =>
        dispatch(await viewReadRequestAction(currentViewName))
      )
    },
    [dispatch]
  )

  // R
  const requestFailed = (reason, key) => {
    dispatch(requestFailedAction(reason, key))
  }

  const requestPending = key => {
    dispatch(requestPendingAction(key))
  }

  const requestSuccess = key => {
    dispatch(requestSuccessAction(key))
  }

  const rowIdShowClear = () => {
    dispatch(rowIdShowClearAction())
  }

  const rowIdShowSet = ruleId => {
    dispatch(rowIdShowSetAction(ruleId))
  }

  const rulesReadRequest = useCallback(async () => {
    dispatch(await rulesReadRequestAction())
  }, [dispatch])

  const ruleTmpAdd = data => {
    dispatch(ruleTmpAddAction(data))
  }

  const ruleTmpRemove = ruleId => {
    dispatch(ruleTmpRemoveAction(ruleId))
  }

  const ruleTmpUpdate = data => {
    dispatch(ruleTmpUpdateAction(data))
  }

  // const ruleCreateRequestOrig = useCallback(
  //   async (rule, currentViewName) => {
  //     if (isNilOrEmpty(currentViewName)) {
  //       red('ruleCreateRequest ERROR', 'must pass in a view name')
  //     }
  //     dispatch(await ruleCreateRequestAction(rule))
  //     dispatch(await viewReadRequestAction(currentViewName))
  //     dispatch(await rulesReadRequestAction())
  //   },
  //   [dispatch]
  // )

  // if (isNilOrEmpty(ruleId)) {
  //   throw new Error('parameter ruleId is incorrect.')
  // }

  const ruleCreateRequest = useCallback(
    async (rule, currentViewName) => {
      dispatch(await ruleCreateRequestAction(rule))
        .then(async () =>
          dispatch(await viewReadRequestAction(currentViewName))
        )
        .then(async () => dispatch(await rulesReadRequestAction()))
    },
    [dispatch]
  )

  const ruleDeleteRequest = useCallback(
    async (ruleId, currentViewName) => {
      dispatch(await ruleDeleteRequestAction(ruleId))
        .then(async () =>
          dispatch(await viewReadRequestAction(currentViewName))
        )
        .then(async () => dispatch(await rulesReadRequestAction()))
    },
    [dispatch]
  )

  const ruleUpdateRequest = useCallback(
    async (ruleId, newRule, currentViewName) => {
      dispatch(await ruleUpdateRequestAction(ruleId, newRule))
        .then(async () =>
          dispatch(await viewReadRequestAction(currentViewName))
        )
        .then(async () => dispatch(await rulesReadRequestAction()))
    },
    [dispatch]
  )

  // BLUEBIRD VERSION
  // const ruleUpdateRequest = useCallback(
  //   (ruleId, newRule, currentViewName) => {
  //     const arr = [
  //       dispatch(ruleUpdateRequestAction(ruleId, newRule)),
  //       dispatch(viewReadRequestAction(currentViewName)),
  //       dispatch(rulesReadRequestAction())
  //     ]
  //     Promise.mapSeries(arr, (fn) => { return fn })
  //   },
  //   [dispatch]
  // )

  // V
  const viewReadRequest = useCallback(
    async view => {
      if (isNilOrEmpty(view)) {
        throw new Error(`${MODULE_NAME} ERROR`, 'parameter view has no value')
      }
      dispatch(await viewReadRequestAction(view))
    },
    [dispatch]
  )

  return (
    <FinanceContext.Provider
      value={{
        criteriaTestClear,
        criteriaTestReadRequest,
        currentViewNameClear,
        currentViewNameSet,
        importDataRequest,
        requestFailed,
        requestPending,
        requestSuccess,
        rowIdShowClear,
        rowIdShowSet,
        ruleCreateRequest,
        rulesReadRequest,
        ruleTmpAdd,
        ruleDeleteRequest,
        ruleTmpRemove,
        ruleTmpUpdate,
        ruleUpdateRequest,
        viewReadRequest
      }}
    >
      {children}
    </FinanceContext.Provider>
  )
}
