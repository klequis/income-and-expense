import actionKeys from 'actionKeys'

export const ruleTmpAddNewAction = {
  fn: (ruleId, data) => ({
    type: actionKeys.ruleTmpAddKey,
    payload: data
  }),
  key: actionKeys.ruleTmpAddKey
}

// not sure I'll need this one

export const ruleTmpUpdateAction = {
  fn: (data) => ({
    type: actionKeys.ruleTmpUpdateKey,
    payload: data
  }),
  key: actionKeys.ruleTmpUpdateKey
}

export const ruleTmpRemoveAction = {
  fn: (ruleId) => ({
    type: actionKeys.ruleTmpRemoveKey,
    payload: { ruleId }
  }),
  key: actionKeys.ruleTmpRemoveKey
}

// Criterion

export const ruleTmpCriterionAddNewAction = {
  fn: (ruleId) => ({
    type: actionKeys.ruleTmpCriterionAddKey,
    payload: { ruleId}
  }),
  key: actionKeys.ruleTmpCriterionAddKey
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

export const ruleTmpActionAddNewAction = {
  fn: (ruleId) => ({
    type: actionKeys.ruleTmpActionAddKey,
    payload: { ruleId }
  }),
  key: actionKeys.ruleTmpActionAddKey
}

export const ruleTmpActionDeleteAction = {
  fn: (ruleId, actionId) => ({
    type: actionKeys.ruleTmpActionDeleteKey,
    payload: { ruleId, actionId }
  }),
  key: actionKeys.ruleTmpActionDeleteKey
}

export const ruleTmpActionUpdateAction = {
  fn: (ruleId, actionId, data) => ({
    type: actionKeys.ruleTmpActionUpdateAction,
    payload: { ruleId, actionId, data }
  }),
  key: actionKeys.ruleTmpActionUpdateAction
}