import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiBasicAuth, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from './filters';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

    app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });

    app.enableCors({
    allowHeaders: ['Authorization'],
    methods: ['*'],
    optionsSuccessStatus: 200,
    origin: process.env.CORS_ORIGIN || '*',
  });

  const Port = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 4000;

  app.useGlobalFilters(new HttpExceptionFilter)
  const config = new DocumentBuilder()
    .setTitle('Exam')
    .setDescription('Api for products')
    .setVersion('1.0')
    .addTag('Products')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

    app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  await app.listen(Port, () => {
    console.log(`http://localhost:${Port}/api ->for server`);
    console.log(`http://localhost:${Port}/docs -> for swagger`);
  });
}
bootstrap();
