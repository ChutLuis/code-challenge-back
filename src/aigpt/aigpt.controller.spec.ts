import { Test, TestingModule } from '@nestjs/testing';
import { AigptController } from './aigpt.controller';
import { AigptService } from './aigpt.service';

describe('AigptController', () => {
  let controller: AigptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AigptController],
      providers: [AigptService],
    }).compile();

    controller = module.get<AigptController>(AigptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
