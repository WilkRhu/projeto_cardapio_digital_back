import { forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import {
  PERMISSION_REPOSITORY,
  USER_REPOSITORY,
} from '../../../src/core/constants/constants';
import { PermissionController } from '../../../src/permission/permission.controller';
import { permissionProvider } from '../../../src/permission/permission.provider';
import { PermissionService } from '../../../src/permission/permission.service';
import { userProviders } from '../../../src/users/user.providers';
import { UsersModule } from '../../../src/users/users.module';

describe('PermissionController', () => {
  let permissionController: PermissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => UsersModule),
        PassportModule,
        UsersModule,
        JwtModule.register({
          secret: process.env.JWTKEY,
          signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
        }),
      ],
      controllers: [PermissionController],
      providers: [PermissionService, ...permissionProvider, ...userProviders],
      exports: [PERMISSION_REPOSITORY, USER_REPOSITORY],
    }).compile();

    permissionController =
      module.get<PermissionController>(PermissionController);
  });

  it('should be defined', () => {
    expect(permissionController).toBeDefined();
  });
});
