import {
  RULES_READ_KEY,
  RULE_CREATE_KEY,
  RULE_UPDATE_KEY,
  RULE_NEW_KEY,
  RULETMP_ADD_KEY,
  RULETMP_REMOVE_KEY,
  RULETMP_UPDATE_KEY
} from './constants'

import replaceRule from 'lib/replaceRule'
import removeRule from 'lib/removeRule'
import { append } from 'ramda'

// eslint-disable-next-line
import { blue, red } from 'logger'

export function rulesReducer(state = [], { type, payload }) {
  switch (type) {
    case RULES_READ_KEY:
      return payload
    case RULE_CREATE_KEY:
      throw new Error('RULE_CREATE_KEY return is undefined')
    case RULE_UPDATE_KEY:
      // Will receive 1 rule. Replace rule with same id
      return replaceRule(payload, state)
    default:
      return state
  }
}

export const ruleNewReducer = (state = [], { type, payload }) => {
  switch (type) {
    case RULE_NEW_KEY:
      return payload
    default:
      return state
  }
}

/**
 *
 * @param {array} state ruleTmp state is an object
 * @param {string} type
 * @param {object || string} payload. Payload is an object for ADD & UPDATE
 *                                    and a string id for REMOVE
 */

export const ruleTmpReducer = (state = [], { type, payload }) => {
  try {
    switch (type) {
      case RULETMP_ADD_KEY:
        const _append = append(payload, state)
        return _append
      case RULETMP_UPDATE_KEY:
        const _update = replaceRule(payload, state)
        return _update
      case RULETMP_REMOVE_KEY:
        return removeRule(payload.ruleId, state)
      default:
        return state
    }
  } catch (e) {
    red('ruleTmpReducer ERROR', e.message)
    console.log(e)
  }
}
