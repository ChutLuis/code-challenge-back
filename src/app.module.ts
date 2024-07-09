import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AigptModule } from './aigpt/aigpt.module';
import { ConfigModule } from '@nestjs/config';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [UsersModule, AigptModule,ConfigModule.forRoot({
    isGlobal:true
  }), OpenaiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
