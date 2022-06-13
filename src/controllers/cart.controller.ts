import { Request, Response } from 'express'
import { cartService } from '../services'

class CartController {
  createCart = async (req: Request, res: Response) => {
    // const cart = await cartService.createCart(req)
    // return res.status(201).json({ cart })
  }
}

export default new CartController()
