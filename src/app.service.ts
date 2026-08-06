import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'BIENVENIDOS A MI PROGRAMA DE NESTJS CON MONGODB Y JWT';
  }
}
