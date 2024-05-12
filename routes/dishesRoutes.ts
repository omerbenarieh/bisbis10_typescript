import { Router } from 'express'
import dishController from '../controllers/dishController'
const router = Router({ mergeParams: true })

router.post('/', dishController.createDish)
router.put('/:id', dishController.updateDish)
router.delete('/:id', dishController.deleteDish)
router.get('/', dishController.getDishesByRestaurant)

export default router
