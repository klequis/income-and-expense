import express from 'express'
import duplicatesCheckNew from './duplicatesCheckNew'
import duplicatesGet from './duplicatesGet'

const router = express.Router()

router.get('/check-new-duplicates', duplicatesCheckNew)
router.get('/', duplicatesGet)

export default router
