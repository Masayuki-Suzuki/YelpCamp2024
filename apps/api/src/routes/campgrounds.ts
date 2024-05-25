import express from 'express'
import { createCampground, getAllCmampGrounds, getCampgroundAuthor, getOneCampGround } from '../controllers/campgrounds.js'

const router = express.Router()

router.get('/', getAllCmampGrounds)
router.get('/:id', getOneCampGround)
router.get('/:id/author', getCampgroundAuthor)

router.post('/create', createCampground)

export default router
