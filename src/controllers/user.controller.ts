import { Request, Response } from 'express'
import { userService } from '../services'

class UserController {
  login = async (req: Request, res: Response) => {
    const { status, message } = await userService.login(req)
    return res.status(status).json(message)
  }

  registerUser = async (req: Request, res: Response) => {
    const user = await userService.register(req)

    return res.status(201).json(user)
  }
}

export default new UserController()
