import { expect } from 'chai'
import { redf, green, yellow } from 'logger'
import * as R from 'ramda'
import operators from 'db/operators'

describe('test operators', function() {
  it('operators.xx.name', function() {
    expect(operators.beginsWith.name).to.equal('beginsWith')
    expect(operators.contains.name).to.equal('contains')
    expect(operators.doesNotContain.name).to.equal('doesNotContain')
    expect(operators.equals.name).to.equal('equals')
  })
  it('operators.xx.type', function() {
    expect(operators.beginsWith.type).to.equal('String')
    expect(operators.contains.type).to.equal('String')
    expect(operators.doesNotContain.type).to.equal('String')
    expect(operators.equals.type).to.equal('String')
  })
  it('opertors.isOneOf', function() {
    green('names', operators.names)
    // expect(operators.isOneOf()).to.equal('a')
  })
})
