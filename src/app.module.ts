import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AigptModule } from './aigpt/aigpt.module';
import { ConfigModule } from '@nestjs/config';
import { OpenaiModule } from './openai/openai.module';
import { PrismaModule } from './prisma/prisma.module';
import { QuotesModule } from './quotes/quotes.module';
import { InventoryService } from './inventory/inventory.service';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [UsersModule, AigptModule,ConfigModule.forRoot({
    isGlobal:true
  }), OpenaiModule, PrismaModule, QuotesModule, InventoryModule],
  controllers: [AppController],
  providers: [AppService, InventoryService],
})
export class AppModule {}
