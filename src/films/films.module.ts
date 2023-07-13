import { Module } from '@nestjs/common';
import { FilmsService } from './services/films/films.service';

@Module({
  providers: [FilmsService]
})
export class FilmsModule {}
