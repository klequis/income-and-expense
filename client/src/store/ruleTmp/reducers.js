import actionKeys from 'actionKeys'
import * as R from 'ramda'
import shortid from 'shortid'

// eslint-disable-next-line
import { green, yellow, red } from 'logger'

const ruleTmpActionAddNew = (ruleId, data) => {
  // const newActions = R.append({ _id: shortid.generate() }, actions)
  // const newRule = R.mergeRight(_rule, { actions: newActions })
}


export const ruleTmpReducer = (state = [], { type, payload }) => {
  try {
    switch (type) {
      case actionKeys.ruleTmpAddKey:
        const _append = R.append(payload, state)
        return _append
      case actionKeys.ruleTmpUpdateKey:
        // const _update = replaceRule(payload, state)
        // return _update
        return state // TODO: implement function
      case actionKeys.ruleTmpUpdateKey:
        // return removeRule(payload.ruleId, state)
        return state // TODO: implement function

      case actionKeys.ruleTmpActionAddKey:
        return state
      case actionKeys.ruleTmpActionDeleteKey:
        return state // TODO: implement function
      case actionKeys.ruleTmpActionUpdateAction:
        return state // TODO: implement function

      case actionKeys.ruleTmpCriterionAddKey:
        return state // TODO: implement function
      case actionKeys.ruleTmpCriterionDeleteKey:
        return state // TODO: implement function
      case actionKeys.ruleTmpCriterionUpdateAction:
        return state // TODO: implement function

      default:
        return state
    }
  } catch (e) {
    red('ruleTmpReducer ERROR', e.message)
    console.log(e)
  }
}
