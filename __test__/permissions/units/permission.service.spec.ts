import { Test, TestingModule } from '@nestjs/testing';
import { PERMISSION_REPOSITORY } from '../../../src/core/constants/constants';
import { permissionProvider } from '../../../src/permission/permission.provider';
import { PermissionService } from '../../../src/permission/permission.service';

describe('PermissionService', () => {
  let service: PermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionService, ...permissionProvider],
      exports: [PERMISSION_REPOSITORY],
    }).compile();

    service = module.get<PermissionService>(PermissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
