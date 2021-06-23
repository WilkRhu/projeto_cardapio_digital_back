import { Test, TestingModule } from '@nestjs/testing';
import { USER_REPOSITORY } from '../core/constants/constants';
import { userProviders } from './user.providers';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, ...userProviders],
      exports: [USER_REPOSITORY],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
