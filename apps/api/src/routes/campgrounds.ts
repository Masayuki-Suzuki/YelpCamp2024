import express from 'express'
import { getAllCmampGrounds } from '../controllers/campgrounds.js'

const router = express.Router()

router.get('/', getAllCmampGrounds)

export default router
