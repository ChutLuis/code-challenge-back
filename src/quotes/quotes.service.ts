import { Injectable } from '@nestjs/common';
import { InventoryService } from 'src/inventory/inventory.service';
import { OpenaiService } from 'src/openai/openai.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuotesService {
  constructor(private prismaservice: PrismaService, private readonly openaiService:OpenaiService,private inventoryService:InventoryService) {}

  async listRFQs() {
    return this.prismaservice.rFQMail.findMany();
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

    // Perform inventory check for each item
    const inventoryChecks = await Promise.all(
      parsedExtract.items.map(async (item:any) => {
        const response = await this.inventoryService.checkInventory(item);
        return { ...item, ...response };
      })
    );

    console.log(inventoryChecks)
    return {mail,extract:JSON.parse(extract),inventoryChecks }
  }
}
