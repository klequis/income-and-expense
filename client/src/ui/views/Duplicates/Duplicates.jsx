import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFinanceContext } from 'financeContext'
import { duplicateStatus } from 'global-constants'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { views } from 'global-constants'
import DuplicateTable from './DuplicateTable'
import * as R from 'ramda'

// eslint-disable-next-line
import { green } from 'logger'

const byAcctId = R.groupBy((dup) => {
  return dup.acctId
})

const byDuplicateStatus = R.groupBy((dup) => {
  return dup.duplicateStatus
})

const Duplicates = () => {
  const { duplicatesReadRequest } = useFinanceContext()

  const _duplicates = useSelector((state) => state.duplicates)

  const _duplicatesNew = _duplicates.filter(
    (dup) => dup.duplicateStatus === duplicateStatus.duplicateNew
  )
  const _duplicatesPending = _duplicates.filter(
    (dup) => dup.duplicateStatus === duplicateStatus.duplicatePending
  )

  // Effects

  useEffect(() => {
    ;(async () => {
      await duplicatesReadRequest()
    })()
  }, [duplicatesReadRequest])


  const _byAcctId = byAcctId(_duplicates)

  return R.map(
    (key) => (
      <>
        <h2>{key}</h2>
        <DuplicateTable rows={R.prop(key)(_byAcctId)} />
      </>
    )
    
  )(R.keys(_byAcctId))
}

export default Duplicates

/*
return (
    <>
      {R.map(
        (acctId) => (
          <>
        <h2>{acctId}</h2>
          <DuplicateTable
            rows={R.filter((x) => acctId === x.acctId, _duplicates)}
          />
          </>
        ),
        accounts
      )}
    </>
  )
*/
