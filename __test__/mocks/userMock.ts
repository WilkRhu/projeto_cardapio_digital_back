import * as faker from 'faker';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import { Role } from '../../src/core/enum/role.enum';
import { Status } from '../../src/core/enum/status.enum';
import { UserMockDto } from '../../src/users/dto/user.mock.dto';

export const usercreate: UserMockDto = {
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(8),
  roles: Role.ADM,
  status: Status.ACT,
};

export const newCreatedUser: UserMockDto = {
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(8),
  roles: Role.ADM,
  status: Status.ACT,
};

export const usercreate2: UserMockDto = {
  ...usercreate,
  email: 'no-email',
};

export const usercreate3: UserMockDto = {
  ...usercreate,
  password: '',
};

export const usercreate4: UserMockDto = {
  ...usercreate,
  password: faker.internet.password(10),
};

export const userUpdate = {
  name: faker.internet.userName(),
};

export const userWaiter: UserMockDto = {
  ...usercreate,
  email: faker.internet.email(),
  roles: Role.WR,
};

export const userCreate: CreateUserDto = {
  uuid: uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(8),
  roles: Role.ADM,
  status: Status.ACT,
};

export const userAll = [
  {
    uuid: uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(8),
    roles: Role.ADM,
    status: Status.ACT,
  },
  {
    uuid: uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(8),
    roles: Role.ADM,
    status: Status.ACT,
  },
];

export const removeUser = 'User Deleted Success!';

export const login = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};

export const validateUser = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};
