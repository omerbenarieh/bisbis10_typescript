import { Request, Response } from 'express'
import db from '../db/db'
class orderController {
  createOrder = async (req: Request, res: Response) => {
    const restaurantId = req.body.restaurantId
    // check if the restaurant has the order items dishes in the database
    const restaurantQuery = {
      text: 'SELECT * FROM dish WHERE restaurantId = $1',
      values: [restaurantId],
    }
    const restaurantDishes = await db.query(restaurantQuery)
    if (restaurantDishes.rows.length === 0) {
      res.status(404).json({
        message: 'Restaurant not found',
      })
      return
    }
    const restaurantDishIds = restaurantDishes.rows.map(dish => dish.id)
    const orderItemsIds = req.body.orderItems.map((item: any) => item.dishId)
    const isOrderValid = orderItemsIds.every((id: number) =>
      restaurantDishIds.includes(id)
    )
    if (!isOrderValid) {
      res.status(400).json({
        message: 'Invalid order items',
      })
      return
    }
    const orderQuery = {
      text: 'INSERT INTO orders (restaurantId, orderItems) VALUES ($1, $2) RETURNING id',
      values: [restaurantId, JSON.stringify(req.body.orderItems)],
    }
    const result = await db.query(orderQuery)

    res.status(200).json({
      orderId: result.rows[0].id,
    })
  }
}

export default new orderController()
