import { Injectable, OnModuleInit } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService implements OnModuleInit {
  private openai: OpenAI;

  onModuleInit() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  getOpenAIInstance(): OpenAI {
    return this.openai;
  }

  async isRFQ(emailContent: string): Promise<boolean> {
    const response = await this.openai.chat.completions.create({
        messages: [{ role: "assistant", content: `Is this email an RFQ? ${emailContent}` }],
        model: "gpt-4o",
      max_tokens: 10,
    });
    console.log(response.choices);
    return response.choices[0].message.content.includes('RFQ');
  }

  async extractRFQDetails(emailContent: string): Promise<any> {
    const response = await this.openai.completions.create({
      model: 'text-davinci-004',
      prompt: `Extract RFQ details from this email: ${emailContent}`,
      max_tokens: 500,
    });
    console.log(response.choices[0].text);
    return response.choices[0].text;
  }

  async askNormal(question: string) {
    const completion = await this.openai.chat.completions.create({
        messages: [{ role: "assistant", content: "Please in a 100 words tell me what an rfq is" }],
        model: "gpt-4o",
      });
    

    console.log(completion.choices[0].message.content.includes('RFQ'));
  }
}
