import React from 'react'
import { useSelector } from 'react-redux'
import CriteriaTestResults from './CriteriaTestResults'

import { useFinanceContext } from 'financeContext'

const Rule = () => {
  const { criteriaTestReadRequest } = useFinanceContext()

  const _ruleTmp = useSelector(state => state.ruleTmp)
  const _criteriaTestResults = useSelector(state => state.criteriaTestResults)

  const _criteriaTestClick = async () => {
    const { criteria } = _ruleTmp
    await criteriaTestReadRequest(criteria)
  }

  return (
    <CriteriaTestResults
      data={_criteriaTestResults}
      criteriaTestClick={_criteriaTestClick}
    />
  )
}

export default Rule

// {_id: "tmp_fXkKuSDbiG", field: "description", operation: "beginsWith", value: "CA DMV"}


