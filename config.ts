import { databaseConfig } from './src/core/database/database.config';

export default process.env.NODE_ENV === 'development'
  ? databaseConfig.development
  : databaseConfig.production;
