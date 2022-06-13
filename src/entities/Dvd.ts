import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { Stock } from './Stock'

@Entity('dvd')
export class Dvd {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column()
  name: string

  @Column()
  duration: string

  @OneToOne(() => Stock, (stock) => stock.dvd, { eager: true })
  stock: Stock
}
