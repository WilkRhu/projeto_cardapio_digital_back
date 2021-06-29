import { PERMISSION_REPOSITORY } from '../core/constants/constants';
import { Permission } from './entities/permission.entity';

export const permissionProvider = [
  {
    provide: PERMISSION_REPOSITORY,
    useValue: Permission,
  },
];
