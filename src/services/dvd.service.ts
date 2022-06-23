import { Request } from 'express'
import { Dvd } from '../entities'
import { ErrorHandler } from '../errors'
import { dvdRepository, stockRepository } from '../repositories'
import { serializedRegisterDvdSchema } from '../schemas'
import { TDvd, TCreateDvd } from '../types'

class DvdService {
  registerDvds = async ({ validated }: Request) => {
    if (!(validated as TDvd).dvds.length) {
      throw new ErrorHandler(400, 'No DVD to be added.')
    }

    const dvds = (validated as TCreateDvd).dvds

    let returnDvds: Dvd[] = []

    for (let { name, duration, quantity, price } of dvds) {
      const stock = await stockRepository.save({ quantity, price })
      const dvd = await dvdRepository.save({ name, duration, stock })
      returnDvds.push(dvd)
    }

    return serializedRegisterDvdSchema.validate(returnDvds)
  }

  getAllDvds = async () => {
    const dvds = await dvdRepository.getAll()

    return await dvds
  }

  buyDvd = async (req: Request) => {
    const dvd = await stockRepository.buy(req.dvd, req.body.quantity)
    return dvd
  }
}

export default new DvdService()
