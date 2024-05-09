import { Request, Response, query } from 'express'
import db from '../db/db'

type QueryConfig = {
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
    const query: QueryConfig = {
      text: 'SELECT * FROM restaurant WHERE id = $1',
      values: [req.params.id],
    }
    const restaurant = await db.query(query)
    res.status(200).json(restaurant.rows)
  }
  createRestaurant = async (req: Request, res: Response) => {
    const query: QueryConfig = {
      text: 'INSERT INTO restaurant (name,isKosher,averageRating,cuisines) VALUES ($1, $2, $3, $4)',
      values: [req.body.name, req.body.isKosher, 0, req.body.cuisines],
    }
    await db.query(query)
    res.status(201).send('Restaurant Created')
  }

  updateRestaurant = async (req: Request, res: Response) => {
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
    res.status(200).send('Restaurant Updated')
  }

  deleteRestaurant = async (req: Request, res: Response) => {
    const query: QueryConfig = {
      text: 'DELETE FROM restaurant WHERE id = $1',
      values: [req.params.id],
    }
    await db.query(query)
    res.status(204).send('Restaurant Deleted')
  }
}
export default new restaurantController()
