import { Router } from 'express'
import dishController from '../controllers/dishController'
const router = Router()

router.post('/', dishController.createDish)
router.put('/:id', dishController.updateDish)
router.delete('/:id', dishController.deleteDish)
router.get('/', dishController.getDishesByRestaurant)

export default router
