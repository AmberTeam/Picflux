import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
    });

    return plainToClass(SerializedFilm, {
      ...film,
      averageRating: await this.getAverageRatingByFilmId(uuid),
    });
  }

  async getAverageRatingByFilmId(filmId: string): Promise<number> {
    const ratings = await this.ratingsRepository.find({
      where: {
        film: {
          uuid: filmId,
        },
      },
    });
    const totalRatings = ratings.length;
    if (totalRatings === 0) return 0;

    const sum = ratings.reduce(
      (accumulator, rating) => accumulator + (rating.rating || 0),
      0,
    );
    return sum / totalRatings;
  }

  async rateFilm(filmId: string, dto: CreateRatingDto, owner: string) {
    const user = await this.usersRepository.findOneBy({ id: owner });
    if (!user) throw new UnauthorizedException('User not found');

    const film = await this.filmsRepository.findOneBy({ uuid: filmId });
    if (!film) throw new BadRequestException('Film not found');

    let rating = await this.ratingsRepository.findOne({
      where: { owner: { id: user.id }, film: { uuid: film.uuid } },
    });

    if (!rating) {
      rating = this.ratingsRepository.create({
        rating: dto.rating,
        owner: user,
        film: film,
      });
    } else {
      rating.rating = dto.rating;
    }

    await this.ratingsRepository.save(rating);
  }
}
