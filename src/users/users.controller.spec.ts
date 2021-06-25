import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';
import {
  removeUser,
  userAll,
  userCreate,
  userUpdate,
} from '../../test/mocks/userMocks';
import { USER_REPOSITORY } from '../core/constants/constants';
import { userProviders } from './user.providers';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

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
    const update = await controller.update(uuid(), userUpdate);
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
