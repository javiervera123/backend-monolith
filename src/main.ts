import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  app.setGlobalPrefix('api/v1');
  // Habilitar validaciones globales y limpiar campos no decorados
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve propiedades no incluidas en el DTO
      forbidNonWhitelisted: true, // Lanza error si envían propiedades extra
      transform: true, // Convierte automáticamente tipos de datos (ej: strings a números)
    }),
  );
}
bootstrap();
