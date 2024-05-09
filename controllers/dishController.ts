import { Request, Response } from 'express'

class dishController {
  createDish = async (req: Request, res: Response) => {}
  updateDish = async (req: Request, res: Response) => {}
  deleteDish = async (req: Request, res: Response) => {}
  getDishesByRestaurant = async (req: Request, res: Response) => {}
}

export default new dishController()
