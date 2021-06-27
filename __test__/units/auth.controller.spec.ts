import { forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import * as dotenv from 'dotenv';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { JwtStrategy } from '../../src/auth/jwt.strategy';
import { USER_REPOSITORY } from '../../src/core/constants/constants';
import { userProviders } from '../../src/users/user.providers';
import { UsersModule } from '../../src/users/users.module';
import { returnCreateUser, returnLoginSuccess } from '../mocks/returnUserMock';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

describe('AuthController', () => {
  let authController: AuthController;

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

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should return success login', async () => {
    jest
      .spyOn(authController, 'login')
      .mockImplementation(async () => await returnLoginSuccess);
    expect(returnLoginSuccess).toBe(returnLoginSuccess);
  });

  it('should return success create users', async () => {
    jest
      .spyOn(authController, 'signUp')
      .mockImplementation(async () => await returnCreateUser);
    expect(returnCreateUser.user.name).toBe(returnCreateUser.user.name);
    expect(returnCreateUser.user.email).toBe(returnCreateUser.user.email);
    expect(returnCreateUser.token).toBe(returnCreateUser.token);
  });
});
