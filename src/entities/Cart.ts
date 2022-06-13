import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { Dvd } from './Dvd'
import { User } from './User'

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ default: false })
  paid?: boolean

  @Column({ type: 'float' })
  total: number

  @OneToOne(() => User, (user) => user)
  @JoinColumn()
  newUser: User

  @ManyToMany(() => Dvd, (dvd) => dvd)
  dvds: Dvd[]
}
