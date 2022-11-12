// NestJs
import { Module } from '@nestjs/common';

// controllers
import { AppController } from './app.controller';

// services
import { AppService } from './app.service';

// modules
import { DataModule } from './data/data.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DataModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
