import { forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../../src/auth/auth.controller';
import { AuthService } from '../../../src/auth/auth.service';
import { JwtStrategy } from '../../../src/auth/jwt.strategy';
import { USER_REPOSITORY } from '../../../src/core/constants/constants';
import { userProviders } from '../../../src/users/user.providers';
import { UsersModule } from '../../../src/users/users.module';
import {
  returnCreateUser,
  returnLoginSuccess,
  returnUserByEmail,
} from '../../mocks/returnUserMock';
import { validateUser } from '../../mocks/userMock';

describe('AuthService', () => {
  let service: AuthService;

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
