import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { OpenaiService } from 'src/openai/openai.service';
import { InventoryService } from 'src/inventory/inventory.service';

@Module({
  providers: [QuotesService,PrismaService,OpenaiService,InventoryService],
  controllers: [QuotesController]
})
export class QuotesModule {}
