import { Module } from '@nestjs/common';
import { AigptService } from './aigpt.service';
import { AigptController } from './aigpt.controller';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  controllers: [AigptController],
  providers: [AigptService],
  imports:[OpenaiModule]
})
export class AigptModule {}
