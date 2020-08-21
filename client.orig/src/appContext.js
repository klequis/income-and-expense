import React, { useCallback, useContext } from 'react'
import {
  rulesReadRequestAction,
  ruleCreateRequestAction,
  ruleDeleteRequestAction,
  ruleUpdateRequestAction
} from 'store/rules/actions'

import {
  ruleTmpCreateAction,
  ruleTmpUpdateAction,
  ruleTmpDeleteAction,
  // ruleTmpCriterionCreateAction,
  // ruleTmpCriterionDeleteAction,
  // ruleTmpCriterionUpdateAction,
  // ruleTmpActionCreateAction,
  // ruleTmpActionDeleteAction,
  // ruleTmpActionUpdateAction
} from 'store/ruleTmp/actions'

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
  requestSuccessAction,
} from 'store/requests/actions'
import {
  rowIdShowClearAction,
  rowIdShowSetAction,
  currentViewNameClearAction,
  currentViewNameSetAction
} from 'store/ui/actions'
import {
  duplicatesReadRequestAction
} from 'store/duplicates/actions'

import actionKeys from './actionKeys'

import * as Promise from 'bluebird'

import isNilOrEmpty from 'lib/isNilOrEmpty'

// eslint-disable-next-line
import { red, blue } from 'logger'

const MODULE_NAME = 'appContext'

export const AppContext = React.createContext()
export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  const dispatch = useDispatch()

  // C
  const criteriaTestClear = () => {
    dispatch(criteriaTestClearAction.fn())
  }

  const criteriaTestReadRequest = useCallback(
    async criteria => {
      dispatch(await criteriaTestReadRequestAction(criteria))
    },
    [dispatch]
  )

  const currentViewNameClear = () => {
    dispatch(currentViewNameClearAction.fn())
  }

  const currentViewNameSet = viewName => {
    dispatch(currentViewNameSetAction.fn(viewName))
  }

  // D
  const duplicatesReadRequest = useCallback(
    async () => {
      dispatch(await duplicatesReadRequestAction())
    },
    [dispatch]
  )

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

  const refreshRulesAndView = useCallback(
    async viewName => {
      // dispatch(await rulesReadRequestAction()).then(async () =>
      //   dispatch(await viewReadRequestAction(viewName))
      // )
      Promise.all([dispatch(await rulesReadRequestAction()), dispatch(await viewReadRequestAction(viewName))])
    },
    [dispatch]
  )

  const requestFailed = (reason, key) => {
    dispatch(requestFailedAction.fn(reason, key))
  }

  const requestPending = key => {
    dispatch(requestPendingAction.fn(key))
  }

  const requestSuccess = key => {
    dispatch(requestSuccessAction.fn(key))
  }

  const rowIdShowClear = () => {
    dispatch(rowIdShowClearAction.fn())
  }

  const rowIdShowSet = ruleId => {
    dispatch(rowIdShowSetAction.fn(ruleId))
  }

  const rulesReadRequest = useCallback(async () => {
    dispatch(await rulesReadRequestAction())
  }, [dispatch])

  const ruleTmpAddNew = data => {
    dispatch(ruleTmpCreateAction.fn(data))
  }

  const ruleTmpRemove = ruleId => {
    dispatch(ruleTmpDeleteAction.fn(ruleId))
  }

  const ruleTmpUpdate = data => {
    dispatch(ruleTmpUpdateAction.fn(data))
  }

  
  // const ruleTmpCriterionAddNew = (ruleId) => {
  //   dispatch(ruleTmpCriterionCreateAction.fn(ruleId))
  // }

  // const ruleTmpCriterionDelete = (ruleId, criterionId) => {
  //   dispatch(ruleTmpCriterionDeleteAction.fn(ruleId, criterionId))
  // }

  // const ruleTmpCriterionUpadate = (ruleId, criterionId, data) => {
  //   dispatch(ruleTmpCriterionUpdateAction.fn(ruleId, criterionId, data))
  // }

  // const ruleTmpActionAddNew = (ruleId) => {
  //   dispatch(ruleTmpActionCreateAction.fn(ruleId))
  // }

  // const ruleTmpActionDelete = (ruleId, actionId) => {
  //   dispatch(ruleTmpActionDeleteAction.fn(ruleId, actionId))
  // }
  
  // const ruleTmpActionUpdate = (ruleId, actionId, data) => {
  //   dispatch(ruleTmpActionUpdateAction.fn(ruleId, actionId, data))
  // }


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
    <AppContext.Provider
      value={{
        actionKeys,
        criteriaTestClear,
        criteriaTestReadRequest,
        currentViewNameClear,
        currentViewNameSet,
        duplicatesReadRequest,
        importDataRequest,
        refreshRulesAndView,
        requestFailed,
        requestPending,
        requestSuccess,
        rowIdShowClear,
        rowIdShowSet,
        ruleCreateRequest,
        rulesReadRequest,
        ruleTmpAdd: ruleTmpAddNew,
        ruleDeleteRequest,
        ruleTmpRemove,
        ruleTmpUpdate,
        ruleUpdateRequest,
        viewReadRequest
      }}
    >
      {children}
    </AppContext.Provider>
  )
}