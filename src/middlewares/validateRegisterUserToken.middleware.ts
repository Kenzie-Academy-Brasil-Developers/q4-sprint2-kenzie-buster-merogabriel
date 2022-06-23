import { NextFunction, Request, Response } from 'express'
import { JwtPayload, verify, VerifyErrors } from 'jsonwebtoken'
import { User } from '../entities'
import { ErrorHandler } from '../errors'
import * as dotenv from 'dotenv'

dotenv.config()

const validateRegisterUserToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.headers.authorization?.split(' ')[1]

  req.validated = req.validated as User

  if (req.validated.isAdm) {
    if (!token) {
      throw new ErrorHandler(401, 'Missing Token.')
    }
  }

  return verify(
    token,
    process.env.SECRET_KEY,
    (err: VerifyErrors, decoded: string | JwtPayload) => {
      req.decoded = decoded as User

      req.validated = req.validated as User

      if (req.validated.isAdm) {
        if (!req.decoded.isAdm) {
          throw new ErrorHandler(401, 'Missing Admin Token.')
        }
      }

      return next()
    }
  )
}

export default validateRegisterUserToken
