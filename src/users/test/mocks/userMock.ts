import * as faker from 'faker';
import { UserMockDto } from '../../dto/user.mock.dto';

export const usercreate: UserMockDto = {
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(8),
  roles: 'admin',
  status: 'activated',
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
