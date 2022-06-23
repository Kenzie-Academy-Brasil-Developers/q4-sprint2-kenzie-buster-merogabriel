import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Dvd, Stock } from '../entities'
import dvdRepository from './dvd.repository'

interface IStockRepo {
  save: (stock: Partial<Stock>) => Promise<Stock>
  buy: (dvd: Dvd, quantity: number) => Promise<Dvd>
  findOne: (payload: object) => Promise<Stock>
}

class StockRepo implements IStockRepo {
  private ormRepo: Repository<Stock>

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Stock)
  }

  save = async (stock: Partial<Stock>) => {
    return await this.ormRepo.save(stock)
  }

  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload })
  }

  buy = async (dvd: Dvd, quantity: number) => {
    const foundDvd = await this.findOne({ dvd: dvd })
    foundDvd.quantity -= quantity
    await this.save(foundDvd)
    return await dvdRepository.findOne({ dvd_id: dvd.dvd_id })
  }
}

export default new StockRepo()
