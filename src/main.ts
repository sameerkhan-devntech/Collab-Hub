import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,         // strip unknown properties
      forbidNonWhitelisted: false,
      transform: true,         // auto-transform payloads to DTO classes
    }),
  );

  // ---- SWAGGER SETUP ----
  const config = new DocumentBuilder()
    .setTitle('CollabHub API')
    .setDescription('API documentation for the CollabHub Backend')
    .setVersion('1.0')
    .addBearerAuth() // Enables JWT Authorization header
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  // ---- END SETUP ----

  
  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000);
  console.log('Server started on port', process.env.PORT ?? 3000);
}
bootstrap();
