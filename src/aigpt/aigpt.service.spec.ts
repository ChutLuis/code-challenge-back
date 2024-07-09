import { Test, TestingModule } from '@nestjs/testing';
import { AigptService } from './aigpt.service';

describe('AigptService', () => {
  let service: AigptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AigptService],
    }).compile();

    service = module.get<AigptService>(AigptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
