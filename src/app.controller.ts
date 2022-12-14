import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { DataService } from './data/data.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dataService: DataService,
  ) {}

  @Get()
  public getHello(@Req() req: Request): Promise<number> {
    console.log(new Date());
    console.log('Req ip = ', req.ip, req.method, req.originalUrl);
    console.log(JSON.stringify(req.headers));
    return this.dataService.logRequest({
      headers: req.headers,
      source: 'getHello',
    });
  }

  @Get('/foo')
  public getFoo(@Req() req: Request): any {
    console.log(new Date());
    console.log('Req ip (foo) = ', req.ip);
    return {
      foo: 'foobar',
    };
  }

  @Get('/items')
  public async getDem(@Req() req: Request): Promise<any[]> {
    const items = await this.dataService.getItems();

    return items.map((item) => ({
      ...item,
      headers: JSON.parse(item.headers),
    }));
  }
}
