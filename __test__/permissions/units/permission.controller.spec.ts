import { Test, TestingModule } from '@nestjs/testing';
import { PERMISSION_REPOSITORY } from '../../../src/core/constants/constants';
import { PermissionController } from '../../../src/permission/permission.controller';
import { permissionProvider } from '../../../src/permission/permission.provider';
import { PermissionService } from '../../../src/permission/permission.service';

describe('PermissionController', () => {
  let permissionController: PermissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionController],
      providers: [PermissionService, ...permissionProvider],
      exports: [PERMISSION_REPOSITORY],
    }).compile();

    permissionController =
      module.get<PermissionController>(PermissionController);
  });

  it('should be defined', () => {
    expect(permissionController).toBeDefined();
  });
});
