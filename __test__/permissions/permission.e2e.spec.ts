import { INestApplication, ValidationPipe } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { AuthModule } from '../../src/auth/auth.module';
import { JwtAuthGuard } from '../../src/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../src/auth/guards/role-auth.guard';
import { JwtStrategy } from '../../src/auth/jwt.strategy';
import { DatabaseModule } from '../../src/core/database/database.module';
import { ConfigService } from '../../src/core/shared/config/config.service';
import { Permission } from '../../src/permission/entities/permission.entity';
import { permissionProvider } from '../../src/permission/permission.provider';
import { PermissionService } from '../../src/permission/permission.service';
import { User } from '../../src/users/entities/user.entity';
import { UsersModule } from '../../src/users/users.module';
import { permissionCreate } from '../mocks/permissionMock';
import { userCreate } from '../mocks/userMock';

describe('UsersService', () => {
  let app: INestApplication;
  let sequelize: Sequelize;
  let userMaster;
  let permissionMaster;

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
        PermissionService,
        ...permissionProvider,
        JwtAuthGuard,
        JwtStrategy,
        ConfigService,
        {
          provide: 'SEQUELIZE',
          useFactory: (configService: ConfigService) => {
            sequelize = new Sequelize(configService.sequelizeOrmConfig);
            sequelize.addModels([Permission]);
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

    permissionMaster = await request(app.getHttpServer())
      .post('/api/permission')
      .set('Authorization', `Bearer ${userMaster['body']['token']}`)
      .send(permissionCreate);
  });

  describe('Permission', () => {
    it('should success return findAll', async () => {
      const permission = await request(app.getHttpServer())
        .get('/api/permission')
        .set('Authorization', `Bearer ${userMaster['body']['token']}`);
      expect(permission.status).toBe(200);
    });
  });

  afterAll(async () => {
    await Permission.destroy({
      truncate: true,
    });
    await User.destroy({
      truncate: true,
    });
    await app.close();
  });
});
