import { Test, TestingModule } from '@nestjs/testing';
import { SraService } from './sra.service';

describe('SraService', () => {
  let service: SraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SraService],
    }).compile();

    service = module.get<SraService>(SraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
