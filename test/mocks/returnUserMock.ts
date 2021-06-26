import * as faker from 'faker';
import * as jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { Role } from '../../src/core/enum/role.enum';
import { Status } from '../../src/core/enum/status.enum';

export const returnLoginSuccess = {
  access_token: jwt.sign({ uuid: uuid() }, 'secret', { expiresIn: '1h' }),
};

export const returnCreateUser = {
  user: {
    uuid: uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(8),
    roles: Role.ADM,
    status: Status.ACT,
  },
  token: jwt.sign({ uuid: uuid() }, 'secret', { expiresIn: '1h' }),
};

export const returnUserByEmail = {
  uuid: uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(8),
  roles: Role.ADM,
  status: Status.ACT,
};

export const returnUserByEmailError = {};
