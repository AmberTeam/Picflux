import { Module } from '@nestjs/common';
import { SraController } from './controllers/sra/sra.controller';
import { SraService } from './services/sra/sra.service';

@Module({
  controllers: [SraController],
  providers: [SraService]
})
export class SraModule {}
