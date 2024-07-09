import { Injectable } from '@nestjs/common';
import { CreateAigptDto } from './dto/create-aigpt.dto';
import { UpdateAigptDto } from './dto/update-aigpt.dto';
import { OpenAI } from 'openai';
import { OpenaiService } from 'src/openai/openai.service';
import { MailValidator } from './dto/validate-email.dto';
@Injectable()
export class AigptService {
  constructor(private openai:OpenaiService){}
  create(createAigptDto: CreateAigptDto) {
    return 'This action adds a new aigpt';
  }

  async validateMail(mail:MailValidator){
    const isRFQ = await this.openai.isRFQ(mail.wholeMail)
    if(isRFQ){
      const quotationData = await this.openai.extractRFQDetails(mail.wholeMail);
      console.log(JSON.parse(quotationData))
    return 'Valid'
    }
    throw new Error("This is not an RFQ")

  }

  findAll() {
    this.openai.askNormal("prueba");
    return `This action returns all aigpt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aigpt`;
  }

  update(id: number, updateAigptDto: UpdateAigptDto) {
    return `This action updates a #${id} aigpt`;
  }

  remove(id: number) {
    return `This action removes a #${id} aigpt`;
  }
}
