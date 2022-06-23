import { Request, Response, NextFunction } from 'express'
import { Dvd } from '../entities'
import { ErrorHandler } from '../errors'
import { dvdRepository } from '../repositories'

const checkStock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dvd: Dvd = await dvdRepository.findOne({
      dvd_id: req.params.dvdUuid,
    })

    req.dvd = dvd
  } catch (err) {
    throw new ErrorHandler(404, 'DVD does not exist.')
  }

  try {
    if (req.body.quantity > req.dvd.stock.quantity) {
      throw new ErrorHandler(422, 'Not enough DVDs in stock.')
    }
  } catch (error) {
    throw new ErrorHandler(404, 'DVD does not exist.')
  }

  return next()
}

export default checkStock
