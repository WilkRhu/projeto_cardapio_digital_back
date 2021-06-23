import { USER_REPOSITORY } from '../core/constants/constants';
import { User } from './entities/user.entity';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
