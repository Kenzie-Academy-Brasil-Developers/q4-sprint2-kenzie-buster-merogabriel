import { Router } from 'express'
import { hello } from '../controllers'

const cartRouter = Router()

cartRouter.put('/pay', hello)

export default cartRouter
