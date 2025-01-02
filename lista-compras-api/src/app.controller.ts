import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/lista-compra/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getInicio(): string {
    return this.appService.getInicio();
  }
}
