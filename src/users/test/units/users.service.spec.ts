import { Test, TestingModule } from '@nestjs/testing';
import { USER_REPOSITORY } from '../../../core/constants/constants';
import { userProviders } from '../../../users/user.providers';
import { UsersService } from '../../users.service';

describe('UsersService', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, ...userProviders],
      exports: [USER_REPOSITORY],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
});
