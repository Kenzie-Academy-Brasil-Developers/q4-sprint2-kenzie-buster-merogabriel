import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Cart } from '../entities'

interface ICartRepo {
  create: (dvds: Partial<Cart[]>) => Promise<Cart[]>
}

class CartRepo implements ICartRepo {
  private ormRepo: Repository<Cart>

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Cart)
  }

  create = async () => await this.ormRepo.find()
}

export default new CartRepo()
