import express from 'express'
import amountByCategory from './amountByCategory'
import dataChanges from './dataChanges'
import originalValues from './originalValues'
import allDataByDescription from './allDataByDescription'
import findDuplicateTransactions from './findDuplicateTransactions'

const router = express.Router()

router.get('/amount-by-category', amountByCategory)
router.get('/data-changes', dataChanges)
router.get('/original-values', originalValues)
router.get('/all-data-by-description', allDataByDescription)
router.get('/raw-data', allDataByDescription)
router.get('/find-duplicates', findDuplicateTransactions)

export default router
