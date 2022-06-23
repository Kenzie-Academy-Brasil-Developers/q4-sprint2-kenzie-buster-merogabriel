import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Dvd } from '../entities'

interface IDvdRepo {
  save: (dvd: Partial<Dvd>) => Promise<Dvd>
  getAll: (payload: object) => Promise<Dvd[]>
  findOne: (payload: object) => Promise<Dvd>
  buy: (dvd: Dvd, quantity: number) => Promise<Dvd>
}

class DvdRepo implements IDvdRepo {
  private ormRepo: Repository<Dvd>

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Dvd)
  }

  save = async (dvd: Partial<Dvd>) => await this.ormRepo.save(dvd)

  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload })
  }

  getAll = async () => await this.ormRepo.find()

  buy = async (dvd: Dvd, quantity: number) => {
    const foundDvd = await this.findOne(dvd)
    foundDvd.stock.quantity -= quantity
    return await this.save(foundDvd)
  }
}

export default new DvdRepo()
