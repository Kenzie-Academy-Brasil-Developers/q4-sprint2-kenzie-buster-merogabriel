import { Request } from 'express'
import { ErrorHandler } from '../errors'
import { cartRepository } from '../repositories'
import { serializedRegisterDvdSchema, getAllDvdsSchema } from '../schemas'
import { TDvd } from '../types'
import { AssertsShape } from 'yup/lib/object'
import { Cart } from '../entities'

class CartService {}

export default new CartService()
