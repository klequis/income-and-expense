import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFinanceContext } from 'financeContext'
import { views } from 'global-constants'
import Table from './Table'
import { dataFields } from 'global-constants'

// eslint-disable-next-line
import { green } from 'logger'

const RawData = () => {
  // Actions
  const { viewReadRequest } = useFinanceContext()

  // Effects
  useEffect(() => {
    ;(async () => {
      await viewReadRequest(views.rawData)
    })()
  }, [viewReadRequest])
  const _viewData = useSelector((state) => state.viewData)

  if (_viewData.length === 0) {
    return <h1>Loading</h1>
  }

  const _columns = [
    '_id',
    'acctId',
    'date',
    'description',
    'origDescription',
    'credit',
    'debit',
    'category1',
    'category2',
    'checkNumber',
    'type',
    'omit'
  ]
  // green('RawData dataFields', dataFields)
  // Methods
  return (
    // <h1>hi</h1>
    <Table
      columns={_columns}
      columnSource={dataFields}
      data={_viewData.filter(
        (doc) => doc.acctId === 'costco.citibank.credit-card.2791' &&  doc.credit === 0
        
      )}
      initialSortField={dataFields.debit.name}
    />
  )
}

export default RawData
