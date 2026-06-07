import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import session from 'express-session';
import helmet from 'helmet';
import { AllExceptionsFilter } from './Common/Filters/all-exceptions/all-exceptions.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
 const config = new DocumentBuilder()
    .setTitle('My API')
    .addBearerAuth()
    .setDescription('NestJS Swagger')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);


  app.use(helmet());
  app.enableCors();
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      },
    }),
  );
  // app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
