import { expect } from 'chai'
import { redf, green, yellow } from 'logger'
import * as R from 'ramda'
import operators from 'db/operators'

describe('test operators', function() {
  const operatorNames = ['beginsWith', 'contains', 'doesNotContain', 'equals']
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
  it('operators.names', function() {
    expect(R.equals(operators.names, operatorNames)).to.equal(true)
  })
  it('opertors.isOneOf', function() {
    // green('names', operators.names)
    operatorNames.forEach((name) =>
      expect(operators.isOneOf(name)).to.equal(true)
    )
  })
})
