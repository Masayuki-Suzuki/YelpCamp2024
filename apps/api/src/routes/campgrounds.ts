import express from 'express'
import { getAllCmampGrounds, getOneCampGround } from '../controllers/campgrounds.js'

const router = express.Router()

router.get('/', getAllCmampGrounds)
router.get('/:id', getOneCampGround)

export default router
