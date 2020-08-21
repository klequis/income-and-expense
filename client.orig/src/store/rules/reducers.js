import replaceRule from 'lib/replaceRule'
import actionKeys from 'actionKeys'

// eslint-disable-next-line
import { blue, red } from 'logger'

export function rulesReducer(state = [], { type, payload }) {
  switch (type) {
    case actionKeys.rulesReadKey:
      blue('rules.length', payload.length)
      return payload
    case actionKeys.ruleCreateKey:
      throw new Error('RULE_CREATE_KEY return is undefined')
    case actionKeys.ruleUpdateKey:
      return replaceRule(payload, state)
    default:
      return state
  }
}

export const ruleNewReducer = (state = [], { type, payload }) => {
  switch (type) {
    case actionKeys.ruleNewKey:
      return payload
    default:
      return state
  }
}
