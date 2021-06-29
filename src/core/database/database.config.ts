import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize/types';
import { IDatabaseConfig } from './interfaces/dbConfig.interface';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

console.log(process.env.DB_DIALECT);
export const databaseConfig: IDatabaseConfig = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_DEVELOPMENT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT as Dialect,
  },
  test: {
    dialect: process.env.DB_DIALECT as Dialect,
    storage: process.env.DB_STORAGE,
    secretOrKey: process.env.JWTKEY,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_PRODUCTION,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT as Dialect,
  },
};
