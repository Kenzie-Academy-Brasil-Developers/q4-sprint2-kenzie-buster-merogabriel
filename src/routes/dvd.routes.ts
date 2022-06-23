import { Router } from 'express'
import { dvdController } from '../controllers'
import {
  validadeSchema,
  isAdm,
  validateToken,
  checkStock,
} from '../middlewares'
import { registerDvdSchema } from '../schemas'

const dvdRouter = Router()

dvdRouter.get('', dvdController.getAllDvds)

dvdRouter.post(
  '/register',
  validateToken,
  isAdm,
  validadeSchema(registerDvdSchema),
  dvdController.registerDvds
)

dvdRouter.post(
  '/buy/:dvdUuid',
  validateToken,
  checkStock,
  dvdController.buyDvds
)

export default dvdRouter
