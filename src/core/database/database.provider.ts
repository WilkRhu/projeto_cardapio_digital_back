import { Sequelize } from 'sequelize-typescript';
import { PermissionEnumEntity } from '../../../src/permission/entities/permission.enum.entity';
import { PermissionsUsers } from '../../permission/entities/permission.entity';
import { User } from '../../users/entities/user.entity';
import {
  DEVELOPMENT,
  PRODUCTION,
  SEQUELIZE,
  TEST,
} from '../constants/constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, PermissionsUsers, PermissionEnumEntity]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
