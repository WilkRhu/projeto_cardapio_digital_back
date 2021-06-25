import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { Sequelize } from 'sequelize/types';
import { User } from 'src/users/entities/user.entity';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let sequelize: Sequelize;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
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
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api/v1/');
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
