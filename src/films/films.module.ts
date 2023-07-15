import { Module } from '@nestjs/common';
import { FilmsService } from './services/films/films.service';
import { Film } from 'src/typeorm/entities/film.entity';
import { User } from 'src/typeorm/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsController } from './controllers/films/films.controller';
import { Rating } from 'src/typeorm/entities/rating.entity';
import { Comment } from 'src/typeorm/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Film, Rating, Comment])],
  providers: [FilmsService],
  controllers: [FilmsController]
})
export class FilmsModule {}
