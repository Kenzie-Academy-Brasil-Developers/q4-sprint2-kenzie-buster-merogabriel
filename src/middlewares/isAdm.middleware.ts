import { Request, Response, NextFunction } from 'express'
import { ErrorHandler } from '../errors'

const isAdm = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.decoded.isAdm) {
    throw new ErrorHandler(401, 'Permission denied')
  }

  return next()
}

export default isAdm
