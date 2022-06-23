import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { Dvd } from './Dvd'

@Entity('stock')
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  stock_id?: string

  @Column()
  quantity: number

  @Column({ type: 'float' })
  price: number

  @OneToOne(() => Dvd, (dvd) => dvd.stock)
  @JoinColumn()
  dvd: Dvd
}
