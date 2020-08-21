import actionKeys from 'actionKeys'

export const ruleTmpCreateAction = {
  fn: (ruleId, data) => ({
    type: actionKeys.ruleTmpCreateKey,
    payload: data
  }),
  key: actionKeys.ruleTmpCreateKey
}

export const ruleTmpDeleteAction = {
  fn: (ruleId, actionId) => ({
    type: actionKeys.ruleTmpDeleteKey,
    payload: { ruleId, actionId }
  }),
  key: actionKeys.ruleTmpDeleteKey
}

export const ruleTmpUpdateAction = {
  fn: (data) => ({
    type: actionKeys.ruleTmpUpdateKey,
    payload: data
  }),
  key: actionKeys.ruleTmpUpdateKey
}

// Criterion

export const ruleTmpCriterionCreateAction = {
  fn: (ruleId) => ({
    type: actionKeys.ruleTmpCriterionCreateKey,
    payload: { ruleId}
  }),
  key: actionKeys.ruleTmpCriterionCreateKey
}

export const ruleTmpCriterionDeleteAction = {
  fn: (ruleId, criterionId) => ({
    type: actionKeys.ruleTmpCriterionDeleteKey,
    payload: { ruleId, criterionId }
  }),
  key: actionKeys.ruleTmpCriterionDeleteKey
}

export const ruleTmpCriterionUpdateAction = {
  fn: (ruleId, criterionId, data) => ({
    type: actionKeys.ruleTmpCriterionUpdateAction,
    payload: { ruleId, criterionId, data }
  }),
  key: actionKeys.ruleTmpCriterionUpdateAction
}

// Action

export const ruleTmpActionCreateAction = {
  fn: (ruleId) => ({
    type: actionKeys.ruleTmpActionCreateKey,
    payload: { ruleId }
  }),
  key: actionKeys.ruleTmpActionCreateKey
}

export const ruleTmpActionDeleteAction = {
  fn: (ruleId, actionId) => ({
    type: actionKeys.ruleTmpDeleteKey,
    payload: { ruleId, actionId }
  }),
  key: actionKeys.ruleTmpDeleteKey
}

export const ruleTmpActionUpdateAction = {
  fn: (ruleId, actionId, data) => ({
    type: actionKeys.ruleTmpActionUpdateAction,
    payload: { ruleId, actionId, data }
  }),
  key: actionKeys.ruleTmpActionUpdateAction
}