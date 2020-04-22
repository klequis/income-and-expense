import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFinanceContext } from 'financeContext'
import DuplicateTable from './DuplicateTable'
import * as R from 'ramda'

// eslint-disable-next-line
import { green } from 'logger'

const byAcctId = R.groupBy((dup) => {
  return dup.acctId
})

// const byDuplicateStatus = R.groupBy((dup) => {
//   return dup.duplicateStatus
// })

const Duplicates = () => {
  const { duplicatesReadRequest } = useFinanceContext()

  const _duplicates = useSelector((state) => state.duplicates)

  // Effects

  useEffect(() => {
    ;(async () => {
      await duplicatesReadRequest()
    })()
  }, [duplicatesReadRequest])


  const _byAcctId = byAcctId(_duplicates)

  return R.map(
    (key) => (
      <div key={key}>
        <h2>{key}</h2>
        <DuplicateTable rows={R.prop(key)(_byAcctId)} />
      </div>
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
