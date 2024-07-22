import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateRFQDto } from './dto/sendQuote.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('getAll')
  getAllQuotes() {
    return this.quotesService.listRFQs();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getById/:id')
  getById(@Param('id') id: string) {
    return this.quotesService.getRFQByID(id);
  }
}
