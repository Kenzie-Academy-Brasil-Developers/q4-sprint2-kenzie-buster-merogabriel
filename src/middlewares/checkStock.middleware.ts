import { Request, Response, NextFunction } from 'express'
import { Cart, Dvd } from '../entities'
import { ErrorHandler } from '../errors'
import { dvdRepository } from '../repositories'

const checkStock = async (req: Request, res: Response, next: NextFunction) => {
  const dvd: Dvd = await dvdRepository.findOne({
    id: req.params.dvdUuid,
  })

  req.dvd = dvd

  return next()
}

export default checkStock
