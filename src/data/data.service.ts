import { Injectable } from '@nestjs/common';
import { RequestDTO } from '../models/request-dto.interface';
import { Client, ClientConfig } from 'pg';

@Injectable()
export class DataService {
  private readonly _client: Client;

  constructor() {
    const config: ClientConfig = {
      user: process.env.PG_USER,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
    };
    this._client = new Client(config);
  }

  public async logRequest(req: RequestDTO): Promise<number> {
    await this._client.connect();

    const query =
      'INSERT INTO requests(source, headers, timestamp) VALUES($1, $2, NOW())';

    const res = await this._client.query(query, [
      req.source,
      JSON.stringify(req.headers),
    ]);

    return res.rowCount;
  }
}
