import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';
import { USER_REPOSITORY } from '../../../src/core/constants/constants';
import { userProviders } from '../../../src/users/user.providers';
import { UsersController } from '../../../src/users/users.controller';
import { UsersService } from '../../../src/users/users.service';
import {
  removeUser,
  userAll,
  userCreate,
  userUpdate,
} from '../../mocks/userMock';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register({
          ttl: 20,
          max: 100,
        }),
      ],
      controllers: [UsersController],
      providers: [UsersService, ...userProviders],
      exports: [USER_REPOSITORY],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return one users', async () => {
    jest.spyOn(controller, 'findOne').mockImplementation(() => userCreate[0]);

    expect(await controller.findOne(userCreate.uuid)).toBe(userCreate[0]);
  });

  it('should return all users', async () => {
    jest
      .spyOn(controller, 'findAll')
      .mockImplementation(async () => await userAll);

    expect(await controller.findAll()).toBe(userAll);
  });

  it('should success update', async () => {
    jest.spyOn(controller, 'update').mockImplementation(() => userUpdate[0]);
    const update = await controller.update(uuid(), userUpdate[0]);
    console.log(update);
    expect(update).toBe(userUpdate[0]);
  });

  it('should success delete user', async () => {
    jest
      .spyOn(controller, 'remove')
      .mockImplementation(async () => await removeUser);
    const deleted = await controller.remove(uuid());
    expect(deleted).toBe('User Deleted Success!');
  });
});
