import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppContext } from 'appContext'
import { duplicateStatus } from 'global-constants'

// eslint-disable-next-line
import { green } from 'logger'

const DuplicateStatus = () => {
  const { duplicatesReadRequest } = useAppContext()

  const _duplicates = useSelector((state) => state.duplicates)
  const _duplicatesNew = _duplicates.filter(
    (dup) => dup.duplicateStatus === duplicateStatus.duplicateNew
  )
  const _duplicatesPending = _duplicates.filter(
    (dup) => dup.duplicateStatus === duplicateStatus.duplicatePending
  )
  useEffect(() => {
    ;(async () => {
      await duplicatesReadRequest()
    })()
  }, [duplicatesReadRequest])

  return (
    <div>
      new {_duplicatesNew.length}, pending {_duplicatesPending.length}
    </div>
  )
}

export default DuplicateStatus

/*
_id: "5e9c76f0e6578c43f74db989"
acctId: "sb.citi.costco-visa.2791"
date: "12/26/2019"
description: "AWS"
origDescription: "Amazon web services aws.amazon.coWA"
credit: 0
debit: -12
category1: "internet"
category2: "aws-charge"
checkNumber: ""
type: ""
omit: false
ruleIds: ["5e7bded2626fca2c6764fb11"]
duplicateId: "5e9e22ad2c184c1fed744a0b"
duplicate: true
duplicateStatus: "duplicatePending"
*/
