import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import "reflect-metadata"
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = 15000 || process.env.PORT

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder().setTitle('IvoryPay')
  .setDescription("IvoryPay")
  .setVersion('v1')
  .addBearerAuth({ 
    description: `[just text field] Please enter token in following format: Bearer <JWT>`,
    name: 'Authorization',
    bearerFormat: 'Bearer',
    scheme: 'Bearer',
    type: 'http',
    in: 'Header'
  },
  'jwt')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));
  app.enableCors({
    origin:["http://localhost:3000",'https://ivorypay-fe.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
  })
  await app.listen(PORT);
}
bootstrap();
