import { Controller, Get, Param } from '@nestjs/common';
import { QuotesService } from './quotes.service';

@Controller('quotes')
export class QuotesController {
    constructor(private readonly quotesService:QuotesService){}


    @Get("getAll")
    getAllQuotes(){
        return this.quotesService.listRFQs()
    }

    @Get("getById/:id")
    getById(@Param('id') id: string){
        return this.quotesService.getRFQByID(id)
    }
}
