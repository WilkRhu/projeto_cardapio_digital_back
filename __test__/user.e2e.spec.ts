import { INestApplication, ValidationPipe } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as jwt from 'jsonwebtoken';
import { Sequelize } from 'sequelize-typescript';
import * as request from 'supertest';
import { v4 as uuid } from 'uuid';
import { AppModule } from '../src/app.module';
import { AuthModule } from '../src/auth/auth.module';
import { JwtAuthGuard } from '../src/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../src/auth/guards/role-auth.guard';
import { JwtStrategy } from '../src/auth/jwt.strategy';
import { DatabaseModule } from '../src/core/database/database.module';
import { ConfigService } from '../src/core/shared/config/config.service';
import { User } from '../src/users/entities/user.entity';
import { userProviders } from '../src/users/user.providers';
import { UsersModule } from '../src/users/users.module';
import { UsersService } from '../src/users/users.service';
import {
  newCreatedUser,
  userCreate,
  usercreate,
  usercreate2,
  usercreate3,
  usercreate4,
  userUpdate,
  userWaiter,
} from './mocks/userMock';

describe('UsersService', () => {
  let app: INestApplication;
  let sequelize: Sequelize;
  let userMaster;
  const Useruuid = [];

  beforeEach(async () => {
    jest.setTimeout(5000);
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule,
        AuthModule,
        DatabaseModule,
        UsersModule,
        JwtModule.register({
          secret: process.env.JWTKEY,
          signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
        }),
      ],
      providers: [
        UsersService,
        ...userProviders,
        JwtAuthGuard,
        JwtStrategy,
        ConfigService,
        {
          provide: 'SEQUELIZE',
          useFactory: (configService: ConfigService) => {
            sequelize = new Sequelize(configService.sequelizeOrmConfig);
            sequelize.addModels([User]);
            return sequelize;
          },
          inject: [ConfigService],
        },
        {
          provide: APP_GUARD,
          useClass: RolesGuard,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('/api');
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    userMaster = await request(app.getHttpServer())
      .post('/api/auth/signup')
      .send(userCreate);
  });

  describe('Users', () => {
    it('should success return findAll', async () => {
      const user = await request(app.getHttpServer())
        .get('/api/users')
        .set('Authorization', `Bearer ${userMaster['body']['token']}`);
      expect(user.status).toBe(200);
    });

    it('should error authorization return findAll', async () => {
      const user = await request(app.getHttpServer())
        .get('/api/users')
        .set('Authorization', `Bearer ${jwt.sign('test', 'shhhhh')}`);
      expect(user.body.statusCode).toBe(401);
      expect(user.body.message).toBe('Unauthorized');
    });

    it('should error unauthorized return findAll', async () => {
      const user = await request(app.getHttpServer()).get('/api/users');
      expect(user.status).toBe(401);
    });

    it('should success return findOne user', async () => {
      const masterUser = await request(app.getHttpServer())
        .post('/api/auth/signup')
        .send(usercreate);
      const userOne = await request(app.getHttpServer())
        .get(`/api/users/${userCreate.uuid}`)
        .set('Authorization', `Bearer ${masterUser.body.token}`);
      expect(userOne.status).toBe(200);
    }, 5000);

    it('should error return findOne user', async () => {
      const userOne = await request(app.getHttpServer())
        .get(`/api/users/${uuid()}`)
        .set('Authorization', `Bearer ${userMaster.body.token}`);
      expect(userOne.status).toBe(401);
    });
    it('should error return findOne user not found', async () => {
      const userOne = await request(app.getHttpServer())
        .get(`/api/users/000`)
        .set('Authorization', `Bearer ${userMaster.body.token}`);
      expect(userOne.body.message).toBe('Unauthorized');
    });

    it('should sucess update', async () => {
      const updateUser = request(app.getHttpServer())
        .patch(`/api/users/${Useruuid[0]}`)
        .set('Authorization', `Bearer ${userMaster.body.token}`)
        .send(userUpdate);
      expect(updateUser['_data'].name).toBe(userUpdate.name);
    });
  });

  describe('Signup', () => {
    it('should return success create user', async () => {
      const newUser = await request(app.getHttpServer())
        .post('/api/auth/signup')
        .send(newCreatedUser);
      expect(newUser.status).toBe(201);
    });

    it('should error on create user validation email', async () => {
      const createUser = await request(app.getHttpServer())
        .post('/api/auth/signup')
        .send(usercreate2);
      expect(createUser.status).toBe(400);
      expect(createUser.body.message[0]).toBe('email must be an email');
    });

    it('should error on create user validation password empty', async () => {
      const createUser = await request(app.getHttpServer())
        .post('/api/auth/signup')
        .send(usercreate3);
      expect(createUser.status).toBe(400);
      expect(createUser.body.message[0]).toBe(
        'password must be longer than or equal to 1 characters',
      );
    });

    it('should error on create user validation password max 8', async () => {
      const createUser = await request(app.getHttpServer())
        .post('/api/auth/signup')
        .send(usercreate4);
      expect(createUser.status).toBe(400);
      expect(createUser.body.message[0]).toBe(
        'password must be shorter than or equal to 8 characters',
      );
    });

    it('should error duplicate email', async () => {
      const user = await request(app.getHttpServer())
        .post('/api/auth/signup')
        .send(userCreate);
      expect(user.body.name).toBe('SequelizeUniqueConstraintError');
      expect(user.body.message).toBe(
        'SQLITE_CONSTRAINT: UNIQUE constraint failed: Users.email',
      );
    });
  });

  describe('Login', () => {
    it('should user login success', async () => {
      const login = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: userCreate.email, password: userCreate.password });
      expect(login.status).toBe(201);
    });

    it('should error login on email', async () => {
      const loginMail = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: 'fulano@email', password: usercreate.password });
      expect(loginMail.body.statusCode).toBe(400);
      expect(loginMail.body.message[0]).toBe('email must be an email');
    });

    it('should error login on password', async () => {
      const loginMail = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: usercreate.email, password: '' });
      expect(loginMail.body.statusCode).toBe(400);
      expect(loginMail.body.message[0]).toBe(
        'password must be longer than or equal to 1 characters',
      );
    });

    it('should error user notfound', async () => {
      const loginUser = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: 'fulano@email.com', password: usercreate.password });
      expect(loginUser.body.error.status).toBe(404);
      expect(loginUser.body.error.message).toBe('User Not Found!');
    });
  });

  describe('Roles', () => {
    it('should error router admin', async () => {
      const newUserWaiter = await request(app.getHttpServer())
        .post('/api/auth/signup')
        .send(userWaiter);
      const userAll = await request(app.getHttpServer())
        .get('/api/users')
        .set('Authorization', `Bearer ${newUserWaiter.body.token}`);
      expect(userAll.statusCode).toBe(401);
      expect(userAll.body.message).toBe(
        'You are not authorized to perform the operation',
      );
    });
  });

  afterAll(async () => {
    await User.destroy({
      truncate: true,
    });
    await app.close();
  });
});
