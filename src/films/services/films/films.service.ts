import { Injectable, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/typeorm/entities/film.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film) private readonly filmsRepository: Repository<Film>,
  ) {}

  async getFilm(uuid: string) {
    const film = await this.filmsRepository.findOneBy({uuid: uuid});

    return film;
  }
}
