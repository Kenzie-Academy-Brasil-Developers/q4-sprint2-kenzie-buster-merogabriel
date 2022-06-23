import { Router } from 'express'
import { cartController } from '../controllers'
import { validateToken } from '../middlewares'

const cartRouter = Router()

cartRouter.put('/pay', validateToken, cartController.payCart)

export default cartRouter
