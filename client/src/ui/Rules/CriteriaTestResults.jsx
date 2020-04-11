import React from 'react'
import { makeStyles } from '@material-ui/styles'
import isNilOrEmpty from 'lib/isNilOrEmpty'
import Button from '@material-ui/core/Button'
import { viewModes } from 'global-constants'

// eslint-disable-next-line
import { green } from 'logger'

const useStyles = makeStyles({
  wrapper: {
    marginBottom: 12
  }
})

const grouped = array =>
  array.reduce((acc, str) => {
    const key = str
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(str)
    return acc
  }, {})

const TestCriteriaResults = ({ data, criteriaTestClick, ruleViewMode }) => {
  // local vars

  const _classes = useStyles()

  // methods

  const groupedData = grouped(data)

  return (
    <div className={_classes.wrapper}>
      {ruleViewMode !== viewModes.modeView ? (
        <Button variant="outlined" size="small" onClick={criteriaTestClick}>
          Test Criteria
        </Button>
      ) : null}
      {!isNilOrEmpty(groupedData)
        ? Object.keys(groupedData).map(key => {
            return (
              <div
                key={groupedData[key]}
              >{`${key} (${groupedData[key].length})`}</div>
            )
          })
        : null}
    </div>
  )
}

export default TestCriteriaResults
