import { Dialect } from 'sequelize/types';

export const config = {
  database: {
    dialect: 'sqlite' as Dialect,
    storage: '../core/database/database.test.sqlite',
    logging: false,
  },
  secretOrKey: process.env.JWTKEY,
};
