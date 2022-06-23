import { Dvd } from './entities'

export type TDvd = { dvds: Dvd[] }

export type TCreateDvd = {
  dvds: [
    {
      name: string
      duration: string
      price: number
      quantity: number
    }
  ]
}
