import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: 5432,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: false,
  entities: ['src/entities/*.ts'],
  migrations: ['src/migration/*.ts'],
  subscribers: [],
});