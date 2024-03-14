import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: 5433,
  username: 'postgres',
  password: 'mbangg12',
  database: 'be-threads',
  synchronize: true,
  logging: false,
  entities: ['src/entities/*.ts'],
  migrations: ['src/migration/*.ts'],
  subscribers: [],
});
