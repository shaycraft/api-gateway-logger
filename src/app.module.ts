// NestJs
import { Module } from '@nestjs/common';

// controllers
import { AppController } from './app.controller';

// services
import { AppService } from './app.service';

// modules
import { DataModule } from './data/data.module';

@Module({
  imports: [DataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
