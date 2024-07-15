import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuotesService {
    constructor(private prismaservice:PrismaService){}


    async listRFQs(){
        return this.prismaservice.rFQMail.findMany()
    }

}
