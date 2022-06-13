import 'reflect-metadata'
import { DataSource } from 'typeorm'
import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config()

// export const AppDataSource = new DataSource({
//   type: 'postgres',
//   username: process.env.DB_USERNAME,
//   password: '1234',
//   database: process.env.DATABASE,
//   logging: false,
//   ssl: { rejectUnauthorized: false },
//   entities: [path.join(__dirname, './entities/**/*.{js,ts}')],
//   migrations: [path.join(__dirname, './migrations/**/*.{js,ts}')],
// })

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'gmero',
  password: '1234',
  database: 'kenzie_buster',
  logging: false,
  entities: [path.join(__dirname, '/entities/**/*.{ts,js}')],
  migrations: [path.join(__dirname, '/migrations/**/*.{ts,js}')],
})
