import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Cart, User } from '../entities'

interface ICartRepo {
  create: (cart: Partial<Cart>) => Promise<Cart>
  findOne: (userId: Partial<User>) => Promise<Cart>
  pay: (cart: Cart) => Promise<Cart>
  save: (cart: Partial<Cart>) => Promise<Cart>
}

class CartRepo implements ICartRepo {
  private ormRepo: Repository<Cart>

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Cart)
  }

  save = async (cart: Partial<Cart>) => await this.ormRepo.save(cart)

  create = async (cart: Partial<Cart>) => await this.ormRepo.save(cart)

  findOne = async (userId: Partial<User>) => {
    return await this.ormRepo.findOneBy({})
  }

  pay = async (cart: Cart) => {
    cart.paid = true
    return await this.save(cart)
  }
}

export default new CartRepo()
