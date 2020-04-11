import { combineReducers } from 'redux'
import { requestsReducer } from './requests/reducers'
import { toastReducer } from './toast/reducers'
import { viewDataReducer } from './views/reducers'
import { rulesReducer, ruleTmpReducer } from './rules/reducers'
import { criteriaTestReducer } from './criteriaTest/reducers'
import { rowIdShowReducer, currentViewNameReducer } from './ui/reducers'

const rootReducer = combineReducers({
  criteriaTestResults: criteriaTestReducer,
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
