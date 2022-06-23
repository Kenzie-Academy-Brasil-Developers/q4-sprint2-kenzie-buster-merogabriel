import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
} from 'typeorm'
import { Stock } from './Stock'
import { Cart } from './Cart'

@Entity('dvd')
export class Dvd {
  @PrimaryGeneratedColumn('uuid')
  dvd_id?: string

  @Column()
  name: string

  @Column()
  duration: string

  @OneToOne(() => Stock, (stock) => stock.dvd, { eager: true })
  stock: Stock

  @ManyToMany(() => Cart, (cart) => cart.dvds)
  carts: Cart[]
}
