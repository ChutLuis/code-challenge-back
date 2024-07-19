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

  @Get('getById/:id')
  getById(@Param('id') id: string) {
    return this.quotesService.getRFQByID(id);
  }

  @Post('sendMail/:id')
  create(@Body() sendQuoteDTO: CreateRFQDto, @Param('id') id: string) {
    return "POGGG"
  }
}
