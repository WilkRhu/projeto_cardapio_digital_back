import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';
import { USER_REPOSITORY } from '../../../src/core/constants/constants';
import { userProviders } from '../../../src/users/user.providers';
import { UsersService } from '../../../src/users/users.service';
import {
  removeUser,
  userAll,
  userCreate,
  userUpdate,
} from '../../mocks/userMock';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register({
          ttl: 20,
          max: 100,
        }),
      ],
      providers: [UsersService, ...userProviders],
      exports: [USER_REPOSITORY],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return one users', async () => {
    jest.spyOn(service, 'findOne').mockImplementation(() => userCreate[0]);

    expect(await service.findOne(userCreate.uuid)).toBe(userCreate[0]);
  });

  it('should return all users', async () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(async () => await userAll);

    expect(await service.findAll()).toBe(userAll);
  });

  it('should success update', async () => {
    jest.spyOn(service, 'update').mockImplementation(() => userUpdate[0]);
    const update = await service.update(uuid(), userUpdate[0]);
    console.log(update);
    expect(update).toBe(userUpdate[0]);
  });

  it('should success delete user', async () => {
    jest
      .spyOn(service, 'remove')
      .mockImplementation(async () => await removeUser);
    const deleted = await service.remove(uuid());
    expect(deleted).toBe('User Deleted Success!');
  });
});
