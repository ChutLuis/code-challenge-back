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
      messages: [
        {
          role: 'system',
          content: `Is this email an RFQ? Respond with Yes or No ${emailContent}`,
        },
      ],
      model: 'gpt-4o',
      max_tokens: 10,
    });
    return response.choices[0].message.content.includes('Yes');
  }

  async extractRFQDetails(emailContent: string): Promise<any> {
    const jsonFormat = `
    {
  "requester": {
    "name": "John Doe",
    "position": "Procurement Manager",
    "company": "XYZ Manufacturing Inc.",
    "contact": {
      "phone": "(123) 456-7890",
      "email": "john.doe@xyzmanufacturing.com"
    }
  },
  "deadline": "10-07-2024",
  "items": [
    {
      "type": "Aluminum Sheet 6061-T6",
      "thickness": "1/4 inch",
      "dimensions": "4 feet x 8 feet",
      "quantity": 50
    },
    {
      "type": "Aluminum Sheet 5052-H32",
      "thickness": "1/8 inch",
      "dimensions": "4 feet x 8 feet",
      "quantity": 100
    }
  ],
  "services": [
    "Cutting to size as per specified dimensions",
    "Anodizing with clear finish"
  ],
  "delivery": {
    "location": "Dallas, TX",
    "requirements": [
      "lead time",
      "shipping costs"
    ]
  },
  "additional_info": [
    "Bulk order discounts",
    "Promotions available"
  ]
}`;
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'assistant',
          content: `Extract RFQ details and return them in this exct JSON format, even if theres no info on the property  "${jsonFormat}" (do not add anything else,start with the curly braces from the get go) from this email: ${emailContent}`,
        },
      ],
      max_tokens: 500,
      response_format: { type: 'json_object' },
    });
    return response.choices[0].message.content;
  }

  async askNormal(question: string) {
    const completion = await this.openai.chat.completions.create({
      messages: [
        {
          role: 'assistant',
          content: 'Please in a 100 words tell me what an rfq is',
        },
      ],
      model: 'gpt-4o',
    });

    console.log(completion.choices[0].message.content.includes('RFQ'));
  }
}
