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
    const update = await service.update(uuid(), userUpdate);
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
