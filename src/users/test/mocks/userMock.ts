import * as faker from 'faker';
import { Role } from '../../../core/enum/role.enum';
import { Status } from '../../../core/enum/status.enum';
import { UserMockDto } from '../../dto/user.mock.dto';

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
