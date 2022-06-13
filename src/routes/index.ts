import { Express } from 'express'
import userRouter from './user.routes'
import cartRouter from './cart.routes'
import dvdRouter from './dvd.routes'

const registerRouters = (app: Express): void => {
  app.use('/api/users', userRouter)
  app.use('/api/dvds', dvdRouter)
  app.use('/api/carts', cartRouter)
}

export default registerRouters
