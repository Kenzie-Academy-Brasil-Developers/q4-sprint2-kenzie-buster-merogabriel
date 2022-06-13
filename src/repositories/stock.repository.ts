import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Stock } from '../entities'

interface IStockRepo {
  saveMany: (stocks: Partial<Stock[]>) => Promise<Stock[]>

  findOne: (payload: object) => Promise<Stock>
}

class StockRepo implements IStockRepo {
  private ormRepo: Repository<Stock>

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Stock)
  }

  //   save = async (stock: Partial<Stock>) => await this.ormRepo.save(stock)

  saveMany = async (stocks: Stock[]) => {
    const insertedStocks = await this.ormRepo
      .createQueryBuilder()
      .insert()
      .values(stocks)
      .execute()
  }

  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload })
  }
}

export default new StockRepo()
