import { databaseConfig } from '../database.config';

module.exports = databaseConfig[process.env.NODE_ENV];
