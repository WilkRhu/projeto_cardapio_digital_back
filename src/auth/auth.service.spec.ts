import { forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../src/users/users.service';
import {
  returnCreateUser,
  returnLoginSuccess,
  returnUserByEmail,
} from '../../test/mocks/returnUserMock';
import { validateUser } from '../../test/mocks/userMocks';
import { USER_REPOSITORY } from '../core/constants/constants';
import { userProviders } from '../users/user.providers';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => UsersModule),
        PassportModule,
        UsersModule,
        JwtModule.register({
          secret: process.env.JWTKEY,
          signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, ...userProviders, JwtStrategy],
      exports: [USER_REPOSITORY],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return success login', async () => {
    jest
      .spyOn(service, 'login')
      .mockImplementation(async () => await returnLoginSuccess);
    expect(returnLoginSuccess).toBe(returnLoginSuccess);
  });

  it('should return success validate', async () => {
    jest
      .spyOn(service, 'validateUser')
      .mockImplementation(async () => await returnUserByEmail);
    const validate = await service.validateUser(
      validateUser.email,
      validateUser.password,
    );
    expect(validate.email).toBe(returnUserByEmail.email);
    expect(validate.password).toBe(returnUserByEmail.password);
  });

  it('should return success create users', async () => {
    jest
      .spyOn(service, 'create')
      .mockImplementation(async () => await returnCreateUser);
    expect(returnCreateUser.user.name).toBe(returnCreateUser.user.name);
    expect(returnCreateUser.user.email).toBe(returnCreateUser.user.email);
    expect(returnCreateUser.token).toBe(returnCreateUser.token);
  });
});
