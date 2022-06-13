import { Router } from 'express'
import { userController } from '../controllers'
import {
  validadeSchema,
  verifyUserExists,
  validateRegisterUserToken,
} from '../middlewares'
import { loginSchema, registerUserSchema } from '../schemas'

const userRouter = Router()

userRouter.post(
  '/register',
  validadeSchema(registerUserSchema),
  verifyUserExists,
  validateRegisterUserToken,
  userController.registerUser
)

userRouter.post('/login', validadeSchema(loginSchema), userController.login)

export default userRouter
