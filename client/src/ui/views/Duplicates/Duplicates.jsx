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

  const accounts = R.pipe(
    R.map((x) => x.acctId),
    R.uniq
  )(_duplicates)


  return <DuplicateTable rows={_duplicates} />
}

export default Duplicates
