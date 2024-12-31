import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { conexaoDb } from './config/conexaoDb';
import { ItemModule } from './item/item.module';

@Module({
  imports: [conexaoDb, ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
