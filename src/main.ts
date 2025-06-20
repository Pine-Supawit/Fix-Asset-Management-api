import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT || 3000
  const logger = new Logger()
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Assets Management API')
    .setDescription('The API for managing assets')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.enableCors()
  await app.listen(port);
  logger.warn(`Listening on port ` + port)
}
bootstrap();
