import { Module } from '@nestjs/common';
import { FilmsService } from './services/films/films.service';
import { Film } from 'src/typeorm/entities/film.entity';
import { User } from 'src/typeorm/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsController } from './controllers/films/films.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Film])],
  providers: [FilmsService],
  controllers: [FilmsController]
})
export class FilmsModule {}
