import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import CriterionView from './CriterionView'
import CriterionEdit from './CriterionEdit'
import ActionView from './ActionView'
import ActionEdit from './ActionEdit'
import ActionButton from 'ui/elements/ActionButton'
import CriteriaTestResults from './CriteriaTestResults'
import { buttonTypes } from 'ui/elements/ActionButton'
import { viewModes } from 'global-constants'
import {
  append,
  findIndex,
  insert,
  mergeRight,
  prop,
  propEq,
  remove
} from 'ramda'
import isTmpRule from 'lib/isTmpRule'
import { useFinanceContext } from 'financeContext'
import removeLeadingSlash from 'lib/removeLeadingSlash'
import { withRouter } from 'react-router-dom'
import shortid from 'shortid'

// eslint-disable-next-line
import { green, yellow, red } from 'logger'

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    width: '100%',
    // backgroundColor: 'red'
  },
  ruleId: {
    marginTop: 4,
    marginBottom: 4,
    fontWeight: 'bold'
  },
  actionButton: {
    marginRight: 30
  },
  actionsTitle: {
    fontWeight: 'bold',
    paddingTop: 16,
    paddingBottom: 4
  },
  ruleTitle: {
    display: 'flex',
    alignItems: 'center'
  }
})

const getRule = (ruleId, state) => {
  const rules = isTmpRule(ruleId) ? state.ruleTmp : state.rules
  const idx = findIndex(propEq('_id', ruleId))(rules)
  return rules[idx]
}

const Rule = ({ location, ruleId, removeRuleId, updateRulesAndView }) => {
  // actions

  const {
    criteriaTestClear,
    criteriaTestReadRequest,
    rowIdShowClear,
    ruleCreateRequest,
    ruleDeleteRequest,
    ruleTmpAdd,
    ruleTmpRemove,
    ruleTmpUpdate,
    ruleUpdateRequest
  } = useFinanceContext()

  // state

  const [_rule, _setRule] = useState(
    useSelector(state => getRule(ruleId, state))
  )
  const [_viewMode, _setViewMode] = useState(
    isTmpRule(ruleId) ? viewModes.modeNew : viewModes.modeView
  )
  const [_dirty, _setDirty] = useState(false)

  // local vars

  // const _ruleTmp = useSelector(state => getRule(ruleId, state))
  const _criteriaTestResults = useSelector(state => state.criteriaTestResults)
  const _classes = useStyles()

  const { pathname } = location
  const _currentViewName = removeLeadingSlash(pathname)

  // methods

  const _actionChange = action => {
    const { actions } = _rule
    const actionId = prop('_id', action)
    const idx = findIndex(propEq('_id', actionId))(actions)
    const newActions =
      actions.length === 0 || idx === -1
        ? [action]
        : insert(idx, action, remove(idx, 1, actions))
    const newRule = mergeRight(_rule, { actions: newActions })
    _setRule(newRule)
    ruleTmpUpdate(newRule)
  }

  const _actionAdd = () => {
    const { actions } = _rule
    const newActions = append({ _id: shortid.generate() }, actions)
    const newRule = mergeRight(_rule, { actions: newActions })
    _setRule(newRule)
    ruleTmpUpdate(newRule)
  }

  const _actionRemove = actionId => {
    const { actions } = _rule
    // const actionId = prop('_id', action)
    const idx = findIndex(propEq('_id', actionId))(actions)
    const newActions = remove(idx, 1, actions)
    const newRule = mergeRight(_rule, { actions: newActions })
    _setRule(newRule)
    ruleTmpUpdate(newRule)
    _setDirty(true)
  }

  const _cancelClick = () => {
    ruleTmpRemove(ruleId)
    criteriaTestClear()
    if (isTmpRule(ruleId)) {
      removeRuleId(ruleId)
    }
    _setViewMode(viewModes.modeView)
  }

  const _criterionChange = criterion => {
    criteriaTestClear()
    const { criteria } = _rule

    const criterionId = prop('_id', criterion)
    const idx = findIndex(propEq('_id', criterionId))(criteria)

    const newCriteria =
      criteria.length === 0 || idx === -1
        ? [criterion]
        : insert(idx, criterion, remove(idx, 1, criteria))

    const newRule = mergeRight(_rule, { criteria: newCriteria })
    _setRule(newRule)
    ruleTmpUpdate(newRule)
  }

  const _criterionAdd = () => {
    const { criteria } = _rule
    const newCriteria = append(
      { _id: shortid.generate(), field: '', operation: '', value: '' },
      criteria
    )
    const newRule = mergeRight(_rule, { criteria: newCriteria })
    _setRule(newRule)
    ruleTmpUpdate(newRule)
  }

  const _criterionRemove = criterionId => {
    const { criteria } = _rule
    const idx = findIndex(propEq('_id', criterionId))(criteria)
    const newCriteria = remove(idx, 1, criteria)
    const newRule = mergeRight(_rule, { criteria: newCriteria })
    _setRule(newRule)
    ruleTmpUpdate(newRule)
    _setDirty(true)
  }

  const _deleteClick = async () => {
    await ruleDeleteRequest(ruleId)
    await updateRulesAndView()
    ruleTmpRemove(ruleId)
    removeRuleId(ruleId)
  }

  const _dirtyChange = isDirty => {
    _setDirty(isDirty)
  }

  const _editClick = criterionId => {
    ruleTmpAdd(_rule)
    _setViewMode(viewModes.modeEdit)
  }

  const _saveClick = async () => {
    if (isTmpRule(ruleId)) {
      await ruleCreateRequest(_rule, _currentViewName)
    } else {
      await ruleUpdateRequest(ruleId, _rule, _currentViewName)
    }
    criteriaTestClear()
    ruleTmpRemove(ruleId)
    _setViewMode(viewModes.modeView)
    removeRuleId(ruleId)
    rowIdShowClear()
  }

  const _criteriaTestClick = async () => {
    const { criteria } = _rule
    // green('_criteriaTestClick: _ruleTmp', )
    await criteriaTestReadRequest(criteria)
  }

  // render

  return (
    <div key={ruleId} className={_classes.wrapper}>
      <div>
        <div className={_classes.ruleTitle}>
          <div className={_classes.ruleId}>RuleId: {ruleId}</div>
          {_viewMode === viewModes.modeView ? (
            <ActionButton buttonType={buttonTypes.edit} onClick={_editClick} />
          ) : (
            <>
              <ActionButton
                buttonType={buttonTypes.save}
                onClick={_saveClick}
                disabled={!_dirty}
              />
              <ActionButton
                buttonType={buttonTypes.cancel}
                onClick={_cancelClick}
              />
              <ActionButton
                buttonType={buttonTypes.delete}
                onClick={_deleteClick}
              />
            </>
          )}
        </div>
        <div>
          Criteria{' '}
          {_viewMode === viewModes.modeView ? null : (
            <ActionButton
              buttonType={buttonTypes.add}
              onClick={_criterionAdd}
            />
          )}
        </div>
        {_rule.criteria.map(c => {
          const { _id } = c
          if (_viewMode === viewModes.modeView) {
            return (
              <CriterionView
                key={_id}
                criterion={c}
                handleEditClick={_editClick}
              />
            )
          }
          return (
            <CriterionEdit
              key={_id}
              criterion={c}
              criterionRemove={_criterionRemove}
              handleDirtyChange={_dirtyChange}
              handleCriterionChange={_criterionChange}
            />
          )
        })}
        <div>
          Actions{' '}
          {_viewMode === viewModes.modeView ? null : (
            <ActionButton buttonType={buttonTypes.add} onClick={_actionAdd} />
          )}
        </div>
        {_rule.actions.map(a => {
          const { _id } = a
          if (_viewMode === viewModes.modeView) {
            return <ActionView key={_id} action={a} />
          }
          return (
            <ActionEdit
              key={_id}
              action={a}
              actionRemove={_actionRemove}
              handleDirtyChange={_dirtyChange}
              handleActionChange={_actionChange}
            />
          )
        })}
        <CriteriaTestResults
          data={_criteriaTestResults}
          criteriaTestClick={_criteriaTestClick}
          ruleViewMode={_viewMode}
        />
      </div>
    </div>
  )
}

export default withRouter(Rule)

Rule.propTypes = {
  ruleId: PropTypes.string.isRequired
}
