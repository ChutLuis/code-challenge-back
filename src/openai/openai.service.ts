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
        messages: [{ role: "system", content: `Is this email an RFQ? Respond with Yes or No ${emailContent}` }],
        model: "gpt-4o",
      max_tokens: 10,
    });
    return response.choices[0].message.content.includes('Yes');
  }

  async extractRFQDetails(emailContent: string): Promise<any> {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "assistant", content: `Extract RFQ details and return them in JSON format (do not add anything else,start with the curly braces from the get go) from this email: ${emailContent}` }],
      max_tokens: 500,
    })
    return response.choices[0].message.content;
  }

  async askNormal(question: string) {
    const completion = await this.openai.chat.completions.create({
        messages: [{ role: "assistant", content: "Please in a 100 words tell me what an rfq is" }],
        model: "gpt-4o",
      });
    

    console.log(completion.choices[0].message.content.includes('RFQ'));
  }
}
