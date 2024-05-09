import { Router } from 'express'
import ratingController from '../controllers/ratingController'
const router = Router()

router.post('/', ratingController.createRating)

export default router
