import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { append, without } from 'ramda'
import { useAppContext } from 'appContext'
import shortid from 'shortid'
import Rule from './Rule'
import ActionButton, { buttonTypes } from 'ui/elements/ActionButton'

// eslint-disable-next-line
import { green, yellow, red } from 'logger'

const Rules = ({ docId, ruleIds = [], updateRulesAndView }) => {
  // actions

  const { ruleTmpAdd } = useAppContext()

  // local vars

  const _rowIdShow = useSelector(state => state.ui.rowIdShow)

  // state

  const [_ruleIds, _setRuleIds] = useState(ruleIds)

  // methods

  const _ruleTmpAddClick = async () => {
    const tmpId = `tmp_${shortid.generate()}`
    ruleTmpAdd({
      _id: tmpId,
      criteria: [
        {
          _id: `tmp_${shortid.generate()}`,
          field: '',
          operation: '',
          value: ''
        }
      ],
      actions: [
        {
          _id: `tmp_${shortid.generate()}`
        }
      ]
    })
    const newRuleIds = append(tmpId, _ruleIds)
    _setRuleIds(newRuleIds)
  }

  const _removeRuleId = ruleId => {
    const newRuleIds = without([ruleId], _ruleIds)
    _setRuleIds(newRuleIds)
  }

  // render

  if (docId !== _rowIdShow) {
    return null
  }
  if (_ruleIds.length === 0) {
    return (
      <tr>
        <td colSpan="8">
          Rules{' '}
          {/* <ActionButton buttonType={buttonTypes.add} onClick={_ruleTmpAddClick}>
            Add Rule
          </ActionButton> */}
          <ActionButton buttonType={buttonTypes.add} onClick={_ruleTmpAddClick} />
        </td>
      </tr>
    )
  }
  return _ruleIds.map(id => (
    <tr key={id}>
      <td colSpan="8">
        Rules{' '}
        {/* <ActionButton buttonType={buttonTypes.add} onClick={_ruleTmpAddClick}>
          Add Rule
        </ActionButton> */}
        <ActionButton buttonType={buttonTypes.add} onClick={_ruleTmpAddClick} />
        <Rule
          ruleId={id}
          ruleIds={_ruleIds}
          removeRuleId={_removeRuleId}
          updateRulesAndView={updateRulesAndView}
        />
      </td>
    </tr>
  ))
}

export default Rules
