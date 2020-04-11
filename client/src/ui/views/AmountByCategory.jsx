import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { useFinanceContext } from 'financeContext'
import { views } from 'global-constants'
import { prop, sortBy } from 'ramda'

// eslint-disable-next-line
import { green, red } from 'logger'

const sortById = sortBy(prop('_id'))

const useStyles = makeStyles({
  numberCell: {
    textAlign: 'right'
  }
})

const AmountByCategory = () => {
  // Actions
  const { viewReadRequest, currentViewNameSet } = useFinanceContext()

  // Effects
  useEffect(() => {
    ;(async () => {
      await viewReadRequest(views.amountByCategory)
      currentViewNameSet(views.amountByCategory)
    })()
  }, [currentViewNameSet, viewReadRequest])

  // Local vars
  const _viewData = useSelector(state => state.viewData)
  const _sortedViewData = sortById(_viewData)
  const _classes = useStyles()

  if (_viewData.length === 0) {
    return <h1>Loading</h1>
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {_sortedViewData.map(doc => {
            const { _id, amount } = doc
            return (
              <tr key={_id}>
                <td>{_id}</td>
                <td className={_classes.numberCell}>
                  {amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2
                  })}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default AmountByCategory
