import { Request, Response } from 'express'

class restaurantController {
  getAllRestaurants = (req: Request, res: Response) => {
    if (req.query.cuisine) {
      res.send(`Get Restaurants with cuisine ${req.query.cuisine}`)
    } else {
      res.send('Get All Restaurants')
    }
  }

  getRestaurant = (req: Request, res: Response) => {
    res.send('Get Restaurant')
  }
  createRestaurant = (req: Request, res: Response) => {
    res.send('Create Restaurant')
  }

  updateRestaurant = (req: Request, res: Response) => {
    res.send('Update Restaurant')
  }

  deleteRestaurant = (req: Request, res: Response) => {
    res.send('Delete Restaurant')
  }
}
export default new restaurantController()
