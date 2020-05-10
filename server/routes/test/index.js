import express from 'express'
import test1 from './test1'
import convertDebitValueToNumber from './convertDebitValueToNumber'
import rulesCheck from './rulesCheck'
// import rulesCheckFull from './rulesCheck.full'

const router = express.Router()

router.get('/test1', test1)
router.get('/convert-debit-value-to-number', convertDebitValueToNumber)
router.get('/rules-check', rulesCheck)
// router.get('/rules-check-full', rulesCheckFull)

export default router
