import { User, Dvd, Stock } from '../entities'
import { TDvd } from '../types'

declare global {
  namespace Express {
    interface Request {
      validated: User | TDvd | Stock
      decoded: User
      dvd: Dvd
    }
  }
}
