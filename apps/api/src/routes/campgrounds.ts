import express from 'express'
import { createCampground, getAllCmampGrounds, getCampgroundAuthor, getOneCampGround, updateCampground } from '../controllers/campgrounds.js'

const router = express.Router()

router.get('/', getAllCmampGrounds)
router.get('/:id', getOneCampGround)
router.get('/:id/author', getCampgroundAuthor)

router.post('/create', createCampground)

router.put('/:id/update', updateCampground)

export default router
