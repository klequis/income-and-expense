import * as R from 'ramda'

export const isString = value => R.type(value) === String.name
