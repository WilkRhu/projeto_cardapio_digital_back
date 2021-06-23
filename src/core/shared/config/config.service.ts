import { Injectable } from '@nestjs/common';
import { config } from '../../../core/database/config';

@Injectable()
export class ConfigService {
  get sequelizeOrmConfig() {
    return config.database;
  }

  get jwtConfig() {
    return { secretOrKey: config.secretOrKey };
  }
}
