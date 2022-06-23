import { Request } from 'express'
import { ErrorHandler } from '../errors'
import { cartRepository, userRepository } from '../repositories'
import { User, Dvd } from '../entities'

class CartService {
  createCart = async (user: User, dvd: Dvd, quantity: number) => {
    const dvds: Dvd[] = [dvd]
    const total = dvd.stock.price * quantity

    try {
      return await cartRepository.create({ user, dvds, total })
    } catch (error) {
      throw new ErrorHandler(401, 'User has a cart already.')
    }
  }

  payCart = async (req: Request) => {
    const cart = await (
      await userRepository.findOne({ email: req.decoded.email })
    ).cart

    return await cartRepository.pay(cart)
  }
}

export default new CartService()
