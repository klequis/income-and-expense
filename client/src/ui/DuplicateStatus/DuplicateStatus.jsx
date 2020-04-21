import React, { useEffect } from 'react'
import { useFinanceContext } from 'financeContext'

const DuplicateStatus = () => {

  const { duplicatesReadRequest } = useFinanceContext()

  useEffect(() => {
    ;(async () => {
      await duplicatesReadRequest()
    })()
  }, [duplicatesReadRequest])

  return <div>new 10, pending 0</div>
}

export default DuplicateStatus
