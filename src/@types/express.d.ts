import { User, Dvd, Stock } from '../entities'
import { TCreateDvd, TDvd } from '../types'

declare global {
  namespace Express {
    interface Request {
      validated: User | TDvd | Stock | TCreateDvd
      decoded: User
      dvd: Dvd
    }
  }
}
