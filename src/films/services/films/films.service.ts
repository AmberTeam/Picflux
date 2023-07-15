import { BadRequestException, Injectable, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Film } from 'src/typeorm/entities/film.entity';
import { Rating } from 'src/typeorm/entities/rating.entity';
import { Repository } from 'typeorm';
import { SerializedFilm } from '../../../typeorm/entities/film.entity';
import { CreateRatingDto } from 'src/films/dto/CreateRating.dto';
import { User } from 'src/typeorm/entities/user.entity';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film) private readonly filmsRepository: Repository<Film>,
    @InjectRepository(Rating)
    private readonly ratingsRepository: Repository<Rating>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  /**
   *
   * @param uuid Film Id: uuid
   * @returns Serialized User
   */
  async getFilm(uuid: string): Promise<SerializedFilm> {
    const film = await this.filmsRepository.findOne({
      where: { uuid: uuid },
      relations: { ratings: true },
    });

    return plainToClass(SerializedFilm, {
      ...film,
      averageRating:
        film.ratings.reduce((total, rating) => total + rating.rating, 0) /
        film.ratings.length,
    });
  }

  /**
   *
   * @param uuid User Id: uuid
   * @returns error or nothing
   */
  async rateFilm(filmId: string, dto: CreateRatingDto, owner: string) {
    const user = await this.usersRepository.findOneBy({ id: owner });
    if (!user) throw new UnauthorizedException("User not found");

    const film = await this.filmsRepository.findOneBy({ uuid: filmId });
    if (!film) throw new BadRequestException("Film not found");

    const rating = await this.ratingsRepository.create({
      rating: dto.rating,
      owner: user,
      film: film
    });
    if (!rating) throw new BadRequestException();

    await this.ratingsRepository.save(rating);
  }
}
