import { Request, Response } from 'express'
import { cartService, dvdService } from '../services'

class DvdController {
  registerDvds = async (req: Request, res: Response) => {
    const dvds = await dvdService.registerDvds(req)

    return res.status(201).json({ dvds })
  }

  getAllDvds = async (_: Request, res: Response) => {
    const dvds = await dvdService.getAllDvds()

    return res.status(200).json({ dvds })
  }

  buyDvds = async (req: Request, res: Response) => {
    const dvd = await dvdService.buyDvd(req)
    const cart = await cartService.createCart(
      req.decoded,
      dvd,
      req.body.quantity
    )
    Reflect.deleteProperty(cart.user, 'password')
    Reflect.deleteProperty(cart.user, 'iat')
    Reflect.deleteProperty(cart.user, 'exp')
    Reflect.deleteProperty(cart.user, 'cart')

    return res.status(201).json({ cart })
  }
}

export default new DvdController()
