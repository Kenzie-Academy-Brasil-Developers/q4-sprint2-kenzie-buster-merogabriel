import { compare } from 'bcrypt'
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { Cart } from './Cart'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id?: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ default: false })
  isAdm?: boolean

  @OneToOne(() => Cart, (cart) => cart.user, { eager: true })
  cart: Cart

  comparePwd = async (pwdString: string): Promise<boolean> => {
    return await compare(pwdString, this.password)
  }
}
