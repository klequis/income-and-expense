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
      blue('rules.length', payload.length)
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

