import { combineReducers } from 'redux'
import { requestsReducer, actionsPendingReducer } from './requests/reducers'
import { toastReducer } from './toast/reducers'
import { viewDataReducer } from './views/reducers'
import { rulesReducer } from './rules/reducers'
import { ruleTmpReducer } from './ruleTmp/reducers'
import { criteriaTestReducer } from './criteriaTest/reducers'
import { rowIdShowReducer, currentViewNameReducer } from './ui/reducers'
import { duplicatesReducer } from './duplicates/reducers'

const rootReducer = combineReducers({
  duplicates: duplicatesReducer,
  criteriaTestResults: criteriaTestReducer,
  actionsPending: actionsPendingReducer,
  requests: requestsReducer,
  rules: rulesReducer,
  ruleTmp: ruleTmpReducer,
  toast: toastReducer,
  ui: combineReducers({
    rowIdShow: rowIdShowReducer,
    currentViewName: currentViewNameReducer
  }),
  viewData: viewDataReducer
})

export default rootReducer
