import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { DataService } from './data/data.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dataService: DataService,
  ) {}

  @Get()
  public getHello(@Req() req): Promise<number> {
    console.log('Req ip = ', req.ip, req.method, req.originalUrl);
    console.log(JSON.stringify(req.headers));
    return this.dataService.logRequest({
      headers: req.headers,
      source: 'getHello',
    });
  }
}
