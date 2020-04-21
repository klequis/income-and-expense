import express from 'express'
import duplicatesCheckNew from './duplicatesCheckNew'
import duplicatesGet from './duplicatesGet'
const router = express.Router()

router.get('/', duplicatesGet)
router.get('/check-new-duplicates', duplicatesCheckNew)

export default router
