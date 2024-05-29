import express from 'express'
import {
    createCampground,
    deleteCampground,
    getAllCampGrounds,
    getCampgroundAuthor,
    getOneCampGround,
    updateCampground
} from '../controllers/campgrounds.js'

const router = express.Router()

router.get('/', getAllCampGrounds)
router.get('/:id', getOneCampGround)
router.get('/:id/author', getCampgroundAuthor)

router.post('/create', createCampground)

router.put('/:id/update', updateCampground)

router.delete('/:id/delete', deleteCampground)

export default router
