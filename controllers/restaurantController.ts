import { Request, Response, query } from 'express'
import db from '../db/db'

export type QueryConfig = {
  text: string
  values: any[]
}

class restaurantController {
  getAllRestaurants = async (req: Request, res: Response) => {
    let query: QueryConfig
    let restaurants
    if (req.query.cuisine) {
      query = {
        text: `SELECT * 
        FROM restaurant 
        WHERE LOWER($1) = ANY(SELECT LOWER(unnest(cuisines)));`,
        values: [req.query.cuisine],
      }
    } else {
      query = {
        text: 'SELECT * FROM restaurant',
        values: [],
      }
    }
    restaurants = await db.query(query)
    res.status(200).json(restaurants.rows)
  }

  getRestaurant = async (req: Request, res: Response) => {
    // get restaurant by id
    const query1: QueryConfig = {
      text: 'SELECT * FROM restaurant WHERE id = $1',
      values: [req.params.id],
    }
    const restaurant = await db.query(query1)
    if (restaurant.rows.length === 0) {
      res.status(404).json({
        message: 'Restaurant not found',
      })
      return
    }
    // get all dishes by restaurant id
    const query2: QueryConfig = {
      text: 'SELECT * FROM dish WHERE restaurantId = $1',
      values: [req.params.id],
    }
    const dishes = await db.query(query2)
    res.status(200).json({
      ...restaurant.rows[0],
      dishes: dishes.rows,
    })
  }
  createRestaurant = async (req: Request, res: Response) => {
    const query: QueryConfig = {
      text: 'INSERT INTO restaurant (name,isKosher,averageRating,cuisines) VALUES ($1, $2, $3, $4)',
      values: [req.body.name, req.body.isKosher, 0, req.body.cuisines],
    }
    await db.query(query)
    res.sendStatus(201)
  }

  updateRestaurant = async (req: Request, res: Response) => {
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
    let queryString = 'UPDATE restaurant SET '
    const values = [req.params.id]
    const setClauses = []
    if (req.body.name) {
      setClauses.push(`name = $${values.push(req.body.name)}`)
    }

    if (req.body.isKosher) {
      setClauses.push(`isKosher = $${values.push(req.body.isKosher)}`)
    }

    if (req.body.cuisines) {
      setClauses.push(`cuisines = $${values.push(req.body.cuisines)}`)
    }

    queryString += setClauses.join(', ') + ' WHERE id = $1'
    await db.query(queryString, values)
    res.sendStatus(200)
  }

  deleteRestaurant = async (req: Request, res: Response) => {
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

    const query: QueryConfig = {
      text: 'DELETE FROM restaurant WHERE id = $1',
      values: [req.params.id],
    }

    // delete orders of this restaurant
    await db.query('DELETE FROM orders WHERE restaurantId = $1', [
      req.params.id,
    ])
    // delete dishes of this restaurant
    await db.query('DELETE FROM dish WHERE restaurantId = $1', [req.params.id])
    // delete ratings of this restaurant
    await db.query('DELETE FROM rating WHERE restaurantId = $1', [
      req.params.id,
    ])

    await db.query(query)
    res.sendStatus(204)
  }
}
export default new restaurantController()
