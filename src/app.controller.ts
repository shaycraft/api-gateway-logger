import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req): string {
    console.debug('Req ip = ', req.ip, req.method, req.originalUrl);
    console.debug(JSON.stringify(req.headers));
    return this.appService.getHello();
  }
}
