import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller(`${ process.env.BASE_URL }`)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getInicio(): string {
    return this.appService.getInicio();
  }
}
