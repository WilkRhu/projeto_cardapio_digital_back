import * as faker from 'faker';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { v4 as uuid } from 'uuid';
import { Role } from '../../src/core/enum/role.enum';
import { Status } from '../../src/core/enum/status.enum';
import { CreateUserDto } from '../../src/users/dto/create-user.dto';

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

export const userUpdate: UpdateUserDto = {
  name: 'Fulano de Tal',
  email: faker.internet.email(),
  password: faker.internet.password(8),
  roles: Role.ADM,
  status: Status.ACT,
};

export const removeUser = 'User Deleted Success!';

export const login = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};

export const validateUser = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};
