import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AigptModule } from './aigpt/aigpt.module';
import { ConfigModule } from '@nestjs/config';
import { OpenaiModule } from './openai/openai.module';
import { PrismaModule } from './prisma/prisma.module';
import { QuotesModule } from './quotes/quotes.module';

@Module({
  imports: [UsersModule, AigptModule,ConfigModule.forRoot({
    isGlobal:true
  }), OpenaiModule, PrismaModule, QuotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
