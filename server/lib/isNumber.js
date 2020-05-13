import * as R from 'ramda'

export const isNumber = value => R.type(value) === Number.name
