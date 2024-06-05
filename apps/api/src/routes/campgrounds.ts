import express from 'express'
import {
    createCampground,
    deleteCampground,
    getAllCampGrounds,
    getCampgroundAuthor,
    getOneCampGround,
    updateCampground
} from '../controllers/campgrounds.js'
import { catchAsync } from '../utilities/errorHandlingHelper.js'

const router = express.Router()

router.route('/')
    .get(catchAsync(getAllCampGrounds))
    .post(catchAsync(createCampground))

router.route('/:id')
    .get(catchAsync(getOneCampGround))
    .put(catchAsync(updateCampground))
    .delete(catchAsync(deleteCampground))

router.get('/:id/author', getCampgroundAuthor)

export default router
