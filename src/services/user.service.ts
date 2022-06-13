import { Request } from 'express'
import { sign } from 'jsonwebtoken'
import { User } from '../entities'
import { userRepository } from '../repositories'
import * as dotenv from 'dotenv'
import { AssertsShape } from 'yup/lib/object'
import { hash } from 'bcrypt'
import { serializedRegisterUserSchema } from '../schemas'

dotenv.config()

interface ILogin {
  status: number
  message: object
}

class UserService {
  login = async ({ validated }: Request): Promise<ILogin> => {
    const user: User = await userRepository.findOne({
      email: (validated as User).email,
    })

    if (!user) {
      return {
        status: 401,
        message: { message: 'Invalid credentials' },
      }
    }

    if (!(await user.comparePwd((validated as User).password))) {
      return {
        status: 401,
        message: { message: 'Invalid credentials' },
      }
    }

    const token: string = sign({ ...user }, 'fafa', {
      expiresIn: '1h',
    })

    return {
      status: 200,
      message: { token },
    }
  }

  register = async ({ validated }: Request): Promise<AssertsShape<any>> => {
    ;(validated as User).password = await hash((validated as User).password, 10)
    const user: User = await userRepository.save(validated as User)

    return await serializedRegisterUserSchema.validate(user, {
      stripUnknown: true,
    })
  }
}

export default new UserService()
