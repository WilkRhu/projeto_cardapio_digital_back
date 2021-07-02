import { PERMISSION_REPOSITORY } from '../core/constants/constants';
import { PermissionsUsers } from './entities/permission.entity';

export const permissionProvider = [
  {
    provide: PERMISSION_REPOSITORY,
    useValue: PermissionsUsers,
  },
];
