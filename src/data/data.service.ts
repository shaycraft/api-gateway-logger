import { Injectable } from '@nestjs/common';
import { RequestDTO } from '../models/request-dto.interface';
import { Client, ClientConfig } from 'pg';

@Injectable()
export class DataService {
  private _client: Client;
  private readonly _config: ClientConfig;

  // todo:  inject client via constructor injection
  constructor() {
    this._config = {
      user: process.env.PG_USER,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
    };
  }

  public async logRequest(req: RequestDTO): Promise<number> {
    this._client = new Client(this._config);

    await this._client.connect();

    const query =
      'INSERT INTO requests(source, headers, timestamp) VALUES($1, $2, NOW())';

    const res = await this._client.query(query, [
      req.source,
      JSON.stringify(req.headers),
    ]);

    await this._client.end();

    return res.rowCount;
  }
}
