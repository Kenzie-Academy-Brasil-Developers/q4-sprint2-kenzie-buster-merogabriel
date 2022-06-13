import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Dvd } from '../entities'

interface IDvdRepo {
  saveMany: (dvds: Partial<Dvd[]>) => Promise<Dvd[]>
  getAll: (payload: object) => Promise<Dvd[]>
  findOne: (payload: object) => Promise<Dvd>
}

class DvdRepo implements IDvdRepo {
  private ormRepo: Repository<Dvd>

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Dvd)
  }

  saveMany = async (dvds: Dvd[]) => {
    const insertedDvds = await this.ormRepo
      .createQueryBuilder()
      .insert()
      .values(dvds)
      .execute()

    const returnDvds: Dvd[] = []

    for (let { id } of insertedDvds.generatedMaps) {
      returnDvds.push(await this.findOne({ id }))
    }

    return returnDvds
  }

  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload })
  }

  getAll = async () => await this.ormRepo.find()
}

export default new DvdRepo()
