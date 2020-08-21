import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { useSelector } from 'react-redux'
import isTmpRule from 'lib/isTmpRule'
import isNilOrEmpty from 'lib/isNilOrEmpty'
import * as R from 'ramda'
import shortid from 'shortid'
import { useAppContext } from 'appContext'
import { operators, dataFieldNames } from 'global-constants'
import CriterionEdit from './CriterionEdit'
import ActionButton, { buttonTypes } from 'ui/elements/ActionButton'
import Omit from './Omit'

// eslint-disable-next-line
import { green, red } from 'logger'

const getRule = (ruleId, state) => {
  const rules = isTmpRule(ruleId) ? state.ruleTmp : state.rules
  const idx = R.findIndex(R.propEq('_id', ruleId))(rules)
  return rules[idx]
}

const _addTmpRule = (tmpRuleId) => {
  const r = {
    _id: `tmp_${shortid.generate()}`,
    criteria: [
      {
        _id: `tmp_${shortid.generate()}`,
        field: dataFieldNames.description,
        operation: operators.equals,
        value: ''
      }
    ],
    actions: [
      {
        _id: `tmp_${shortid.generate()}`
      }
    ]
  }
  // green('_addTmpRule: r', r)
  return r
}

const hasRule = (doc) => R.has('ruleIds')(doc)

// const isOmitTrue = doc => {
//   if (!hasRule(doc)) {
//     return false
//   } else if (!hasOmitRule) {
//     return false
//   }
//   return true
// }



const Rule = ({ doc, updateRulesAndView }) => {
  const { date } = doc
  // state
  const [_rule, _setRule] = useState(null)
  const [_docDate, _setDocDate] = useState(date)
  const [_dirty, _setDirty] = useState(false)
  

  // actions
  const { ruleTmpAdd, criteriaTestClear } = useAppContext()

  // hooks
  useEffect(() => {
    if (!hasRule(doc)) {
      const rule = _addTmpRule()
      _setRule(rule)
      
    }
  }, [])

  // TODO: _hasOmitRule has not been check for true case yet



  if (isNilOrEmpty(_rule)) {
    
    return null
  }

  green("Rule: _rule", _rule)

  const _criterionRemove = (criterionId) => {
    // const { criteria } = _rule
    // const idx = R.findIndex(R.propEq('_id', criterionId))(criteria)
    // const newCriteria = R.remove(idx, 1, criteria)
    // const newRule = R.mergeRight(_rule, { criteria: newCriteria })
    // _setRule(newRule)
    // _setDirty(true)
  }

  const _criterionChange = (criterion) => {
    criteriaTestClear()
    // const { criteria } = _rule

    // const criterionId = R.prop('_id', criterion)
    // const idx = R.findIndex(R.propEq('_id', criterionId))(criteria)

    // const newCriteria =
    //   criteria.length === 0 || idx === -1
    //     ? [criterion]
    //     : R.insert(idx, criterion, R.remove(idx, 1, criteria))

    // const newRule = R.mergeRight(_rule, { criteria: newCriteria })
    // _setRule(newRule)
  }

  // green('_rule', _rule)

  return (
    <tr>
      <td colSpan="8">
        
        <FormControlLabel
          control={
            <Switch
              //checked={_hasOmitRule(doc)}
              // onChange={_handleSwitchChange('showOmitted')}
              value="thisDateOnly"
            />
          }
          label={`Date = ${date}`}
        />
        <Omit rule={_rule} />
        <div>
          {_rule.criteria.map((c) => {
            const { _id } = c
            return (
              <CriterionEdit
                key={_id}
                criterion={c}
                criterionRemove={_criterionRemove}
                handleCriterionChange={_criterionChange}
                handleDirtyChange={_setDirty}
              />
            )
          })}
          <ActionButton
              buttonType={buttonTypes.add}
              // onClick={_criterionAdd}
            />
        </div>
      </td>
    </tr>
  )
}

export default Rule

Rule.propTypes = {
  // docId: PropTypes.string.isRequired,
  // ruleId: PropTypes.string.isRequired
  doc: PropTypes.object.isRequired,
  updateRulesAndView: PropTypes.func.isRequired
}
