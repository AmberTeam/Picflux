import { Test, TestingModule } from '@nestjs/testing';
import { SraController } from './sra.controller';

describe('SraController', () => {
  let controller: SraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SraController],
    }).compile();

    controller = module.get<SraController>(SraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
