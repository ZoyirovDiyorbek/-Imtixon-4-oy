import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const Port = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000;
  
  const config = new DocumentBuilder()
    .setTitle('Exam')
    .setDescription('Api for products')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  
  await app.listen(Port, () => {
    console.log(`http://localhost:${Port}/api ->for server`);
    console.log(`http://localhost:${Port}/docs -> for swagger`);
  });
}
bootstrap();
