import { Router } from 'express'
import restaurantController from '../controllers/restaurantController'
import DishRouter from '../routes/dishesRoutes'
const router = Router()

router.get('/', restaurantController.getAllRestaurants)
router.get('/:id', restaurantController.getRestaurant)
router.post('/', restaurantController.createRestaurant)
router.put('/:id', restaurantController.updateRestaurant)
router.delete('/:id', restaurantController.deleteRestaurant)

router.use('/:id/dishes', DishRouter)

export default router
