import { Test, TestingModule } from '@nestjs/testing';
import { USER_REPOSITORY } from '../../../core/constants/constants';
import { userProviders } from '../../../users/user.providers';
import { UsersController } from '../../users.controller';
import { UsersService } from '../../users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, ...userProviders],
      exports: [USER_REPOSITORY],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
