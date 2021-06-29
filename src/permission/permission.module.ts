import { Module } from '@nestjs/common';
import { PERMISSION_REPOSITORY } from '../core/constants/constants';
import { UsersModule } from '../users/users.module';
import { PermissionController } from './permission.controller';
import { permissionProvider } from './permission.provider';
import { PermissionService } from './permission.service';

@Module({
  imports: [UsersModule],
  controllers: [PermissionController],
  providers: [PermissionService, ...permissionProvider],
  exports: [PermissionService, PERMISSION_REPOSITORY],
})
export class PermissionModule {}
