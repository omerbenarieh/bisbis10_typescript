import { Request, Response } from 'express'
import { QueryConfig } from './restaurantController'
import db from '../db/db'

class dishController {
  createDish = async (req: Request, res: Response) => {
    // check if restaurant exists
    const restaurantQuery: QueryConfig = {
      text: 'SELECT * FROM restaurant WHERE id = $1',
      values: [req.params.id],
    }
    const restaurant = await db.query(restaurantQuery)
    if (restaurant.rows.length === 0) {
      res.status(404).json({
        message: 'Restaurant not found',
      })
      return
    }
    const { name, description, price } = req.body
    const restaurantId = req.params.id
    const query: QueryConfig = {
      text: 'INSERT INTO dish (name, description, price, restaurantId) VALUES ($1, $2, $3, $4)',
      values: [name, description, price, restaurantId],
    }
    await db.query(query)
    res.sendStatus(201)
  }
  updateDish = async (req: Request, res: Response) => {
    const { description, price } = req.body
    const dishId = req.params.id
    const query: QueryConfig = {
      text: 'UPDATE dish SET description = $1, price = $2 WHERE id = $3',
      values: [description, price, dishId],
    }
    await db.query(query)
    res.sendStatus(200)
  }
  deleteDish = async (req: Request, res: Response) => {
    // check if dish exists
    const dishQuery: QueryConfig = {
      text: 'SELECT * FROM dish WHERE id = $1',
      values: [req.params.id],
    }
    const dish = await db.query(dishQuery)
    if (dish.rows.length === 0) {
      res.status(404).json({
        message: 'Dish not found',
      })
      return
    }
    const dishId = req.params.id
    const query: QueryConfig = {
      text: 'DELETE FROM dish WHERE id = $1',
      values: [dishId],
    }
    await db.query(query)
    res.sendStatus(204)
  }
  getDishesByRestaurant = async (req: Request, res: Response) => {
    const restaurantId = req.params.id
    // check if restaurant exists
    const restaurantQuery: QueryConfig = {
      text: 'SELECT * FROM restaurant WHERE id = $1',
      values: [restaurantId],
    }
    const restaurant = await db.query(restaurantQuery)
    if (restaurant.rows.length === 0) {
      res.status(404).json({
        message: 'Restaurant not found',
      })
      return
    }
    const query: QueryConfig = {
      text: 'SELECT * FROM dish WHERE restaurantId = $1',
      values: [restaurantId],
    }
    const dishes = await db.query(query)
    res.status(200).json(dishes.rows)
  }
}

export default new dishController()
