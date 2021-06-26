import { INestApplication, ValidationPipe } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript';
import * as request from 'supertest';
import { v4 as uuid } from 'uuid';
import { userCreate } from '../../../../test/mocks/userMocks';
import { AppModule } from '../../../app.module';
import { AuthModule } from '../../../auth/auth.module';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/role-auth.guard';
import { JwtStrategy } from '../../../auth/jwt.strategy';
import { DatabaseModule } from '../../../core/database/database.module';
import { ConfigService } from '../../../core/shared/config/config.service';
import { User } from '../../../users/entities/user.entity';
import { userProviders } from '../../../users/user.providers';
import { UsersModule } from '../../../users/users.module';
import { UsersService } from '../../../users/users.service';
import {
  usercreate,
  usercreate2,
  usercreate3,
  usercreate4,
  userUpdate,
} from '../mocks/userMock';

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
        .set('Authorization', `Bearer ${userMaster.body.token}`);
      expect(user.status).toBe(200);
    });

    it('should error unauthorized return findAll', async () => {
      const user = await request(app.getHttpServer()).get('/api/users');
      expect(user.status).toBe(401);
    });

    it.skip('should success return findOne user', async () => {
      console.log(userCreate.uuid);
      const userOne = await request(app.getHttpServer())
        .get(`/api/users/${userCreate.uuid}`)
        .set('Authorization', `Bearer ${userMaster.body.token}`);
      expect(userOne.status).toBe(200);
    });

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
      expect(userMaster.status).toBe(201);
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
  });

  describe('Login', () => {
    it('should user login success', async () => {
      const login = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: usercreate.email, password: usercreate.password });
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
  });

  afterAll(async () => {
    await User.destroy({
      truncate: true,
    });
    await app.close();
  });
});
