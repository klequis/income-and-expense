import express from 'express'
import amountByCategory from './amountByCategory'
import dataChanges from './dataChanges'
import originalValues from './originalValues'
import allDataByDescription from './allDataByDescription'

const router = express.Router()

router.get('/amount-by-category', amountByCategory)
router.get('/data-changes', dataChanges)
router.get('/original-values', originalValues)
router.get('/all-data-by-description', allDataByDescription)
router.get('/raw-data', allDataByDescription)

export default router
