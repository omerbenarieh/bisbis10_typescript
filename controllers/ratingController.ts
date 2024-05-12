import { Request, Response, query } from 'express'
import db from '../db/db'
class ratingController {
  createRating = async (req: Request, res: Response) => {
    // Insert rating into rating table
    const ratingQuery = {
      text: 'INSERT INTO rating (restaurantId, rating) VALUES ($1, $2)',
      values: [req.body.restaurantId, req.body.rating],
    }
    await db.query(ratingQuery)
    // Update averageRating in restaurant table
    const avgRatingQuery = {
      text: `
        UPDATE restaurant 
        SET averageRating = (
          SELECT AVG(rating) FROM rating WHERE restaurantId = $1
        )
        WHERE id = $1
      `,
      values: [req.body.restaurantId],
    }
    await db.query(avgRatingQuery)
    res.sendStatus(200)
  }
}

export default new ratingController()
