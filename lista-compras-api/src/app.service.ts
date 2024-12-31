import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInicio(): string {
    return 'API Lista de compras';
  }
}
