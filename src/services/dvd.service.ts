import { Request } from 'express'
import { ErrorHandler } from '../errors'
import { dvdRepository, stockRepository } from '../repositories'
import { serializedRegisterDvdSchema, getAllDvdsSchema } from '../schemas'
import { TDvd } from '../types'

class DvdService {
  registerDvds = async ({ validated }: Request) => {
    if (!(validated as TDvd).dvds.length) {
      throw new ErrorHandler(400, 'No DVD to be added.')
    }

    const dvds = await dvdRepository.saveMany((validated as TDvd).dvds)

    const stocks = await stockRepository.saveMany((validated as TDvd).dvds)

    // return serializedRegisterDvdSchema.validate(dvds)
    return dvds
  }

  getAllDvds = async () => {
    const dvds = await dvdRepository.getAll()

    return await getAllDvdsSchema.validate(dvds, {
      stripUnknown: true,
    })
  }
}

export default new DvdService()
