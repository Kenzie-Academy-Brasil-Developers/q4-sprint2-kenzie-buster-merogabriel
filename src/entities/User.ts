import { compare } from 'bcrypt'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column({ default: false })
  isAdm?: boolean

  @Column()
  password: string

  // @OneToOne(() => Cart, (cart) => cart.user)
  // cart: Cart

  comparePwd = async (pwdString: string): Promise<boolean> => {
    return await compare(pwdString, this.password)
  }
}
