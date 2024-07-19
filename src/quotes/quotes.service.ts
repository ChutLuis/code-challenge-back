import { Injectable } from '@nestjs/common';
import { InventoryService } from 'src/inventory/inventory.service';
import { OpenaiService } from 'src/openai/openai.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRFQDto } from './dto/sendQuote.dto';

@Injectable()
export class QuotesService {
  constructor(private prismaservice: PrismaService, private readonly openaiService:OpenaiService,private inventoryService:InventoryService) {}

  async listRFQs() {
    return this.prismaservice.rFQMail.findMany({
      where:{
        deletedAt:null
      },
      orderBy:{
        createdAt:"desc"
      }
    });
  }

  async getRFQByID(id: string) {
    const mail = await this.prismaservice.rFQMail.findFirst({
      where: {
        id,
      },
      select:{
        from:true,
        subject:true,
        mailBody:true,
        createdAt:true
      }
    });

    const extract = await this.openaiService.extractRFQDetails(mail.mailBody)
    const parsedExtract = JSON.parse(extract);

    // Parse delivery date
    let deliveryDate;

    if(parsedExtract.deadline!==''){
      deliveryDate = new Date();
    }
    else{
      deliveryDate = "No Constraints"
    }
    
    // Perform inventory check for each item
    const inventoryChecks = await Promise.all(
      parsedExtract.items.map(async (item) => {
        const response = await this.inventoryService.checkInventory(item, deliveryDate);
        if (!response.available && response.alternatives) {
          response.alternatives = await Promise.all(response.alternatives.map(async (alt) => {
            alt.price = await this.inventoryService.calculatePrice(alt, item.quantity, item.custom_dimensions, item.processing);
            return alt;
          }));
        }
        return { ...item, ...response };
      })
    );
    return {mail,extract:JSON.parse(extract),inventoryChecks }
  }


  async createQuoteMail (quotation:CreateRFQDto){

    return "quotedMail"

  }
}
