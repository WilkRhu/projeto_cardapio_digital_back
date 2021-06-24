import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import config from '../swagger/swagger.config';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipe/validates.pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidateInputPipe());
  await app.listen(3000 || process.env.PORT);
}
bootstrap();
