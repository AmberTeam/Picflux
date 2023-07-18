import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Rating } from 'src/typeorm/entities/rating.entity';
import { Filter, NumericType, Repository } from 'typeorm';
import {
  SerializedFilm,
  Film,
  SerializedPaginationFilm,
} from '../../../typeorm/entities/film.entity';
import { CreateRatingDto } from 'src/films/dto/CreateRating.dto';
import { User } from 'src/typeorm/entities/user.entity';
import { Comment } from 'src/typeorm/entities/comment.entity';
import { CreateCommentDto } from 'src/films/dto/CreateComment.dto';
import { KinopoiskDev, MovieFields } from '@openmoviedb/kinopoiskdev_client';
import { config } from 'dotenv';
import { availablePlayers } from 'src/utils/available_players';
import { RequiredFields } from 'src/films/types/required.type';

@Injectable()
export class FilmsService {
  api;
  constructor(
    @InjectRepository(Film) private readonly filmsRepository: Repository<Film>,
    @InjectRepository(Rating)
    private readonly ratingsRepository: Repository<Rating>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {
    config();
    this.api = new KinopoiskDev(process.env.TOKEN);
  }

  async getFilms(offset: number, limit: number, required: RequiredFields) {
    const films = await this.getFilmsWithFields(offset, limit, required);

    return films.map((film) =>
      plainToClass(SerializedPaginationFilm, {
        ...film,
        averageRating: this.getAverageRatingByFilmId(film.id),
      }),
    );
  }

  async search(query: string, offset: number, limit: number) {
    return await this.api.movie.getBySearchQuery({
      query,
      limit: limit,
      page: offset,
    });
  }

  async getPlayers(id: number) {
    config();

    const film = (await this.api.movie.getById(id)).data;
    if (!film) throw new NotFoundException(`Couldn't fond film with id: ${id}`);

    let results = [];

    for (let i = 0; i < availablePlayers.length; i++) {
      let result = null;
      switch (film.type) {
        case 'movie':
          result =
            availablePlayers[i].hrefs[
              Math.floor(Math.random() * availablePlayers[i].hrefs.length)
            ];
          results.push(
            result +
              availablePlayers[i].path_movie +
              availablePlayers[i].construct(id),
          );
          break;
        case 'tv-series':
          result =
            availablePlayers[i].hrefs[
              Math.floor(Math.random() * availablePlayers[i].hrefs.length)
            ];
          results.push(
            result +
              availablePlayers[i].path_serial +
              availablePlayers[i].construct(id),
          );
          break;
        default:
          result =
            availablePlayers[i].hrefs[
              Math.floor(Math.random() * availablePlayers[i].hrefs.length)
            ];
          results.push(
            result +
              availablePlayers[i].path_movie +
              availablePlayers[i].construct(id),
          );
          break;
      }
    }
    results = results.map((result) => {
      return {
        force: result,
        sra: process.env.API_URL + '/api/sra/by_hostname?link=' + result,
      };
    });
    return results;
  }

  async getAllFields(id: number) {
    let query: Filter<MovieFields> = {
      selectFields: [
        'id',
        'name',
        'alternativeName',
        'type',
        'description',
        'shortDescription',
        'rating',
        'poster',
        'backdrop.url',
        'year',
        'movieLength',
        'genres',
        'countries',
        'releaseYears',
      ]
    };

    const data = await this.api.movie.getById(id);
    return data.data;
  }

  async getFilmsWithFields(offset: number, limit: number, required: RequiredFields) {
    let query: Filter<MovieFields>;
    if (required.poster == true) {
      query = {
        selectFields: [
          'id',
          'name',
          'alternativeName',
          'type',
          'description',
          'shortDescription',
          'rating',
          'poster',
          'backdrop',
          'year',
          'movieLength',
          'genres',
          'countries',
          'releaseYears',
        ],
        'poster.url': '!null',
        page: offset,
        limit: limit,
      };
    }
    if (required.backdrop == true) {
      query = {
        selectFields: [
          'id',
          'name',
          'alternativeName',
          'type',
          'description',
          'shortDescription',
          'rating',
          'poster',
          'backdrop.url',
          'year',
          'movieLength',
          'genres',
          'countries',
          'releaseYears',
        ],
        'backdrop.url': '!null',
        page: offset,
        limit: limit,
      };
    } else {
      query = {
        selectFields: [
          'id',
          'name',
          'alternativeName',
          'type',
          'description',
          'shortDescription',
          'rating',
          'poster',
          'backdrop.url',
          'year',
          'movieLength',
          'genres',
          'countries',
          'releaseYears',
        ],
        page: offset,
        limit: limit,
      };
    }

    const { data, error, message } = await this.api.movie.getByFilters(query);
    if (data){
      return data.docs;
    }
    return null;
  }

  /**
   *
   * @param uuid Film Id: uuid
   * @returns Serialized User
   */
  async getFilm(
    id: number,
    user: any
  ): Promise<SerializedFilm> {
    // const film = await this.filmsRepository.findOne({
    //   where: { uuid: uuid },
    // });
    const film = await this.getAllFields(id);
    let isInWatchlist: boolean = false;
    if (user) {
      const userDb = await this.usersRepository.findOneBy({ id: user['sub'] });
      isInWatchlist = userDb.watchList.includes(id);
    }
    return plainToClass(SerializedFilm, {
      ...film,
      averageRating: await this.getAverageRatingByFilmId(id),
      isAuthorized: user != null,
      isInWatchlist: isInWatchlist,
    });
  }

  async getAverageRatingByFilmId(filmId: number): Promise<number> {
    const ratings = await this.ratingsRepository.find({
      where: {
        film: {
          kpId: filmId,
        },
      },
    });
    if (!ratings) return 0;
    const totalRatings = ratings.length;
    if (totalRatings === 0) return 0;

    const sum = ratings.reduce(
      (accumulator, rating) => accumulator + (rating.rating || 0),
      0,
    );
    return sum / totalRatings;
  }

  async rateFilm(filmId: number, dto: CreateRatingDto, owner: string) {
    const user = await this.usersRepository.findOneBy({ id: owner });
    if (!user) throw new UnauthorizedException('User not found');

    const film = (await this.api.movie.getById(filmId)).data;
    let dbFilm: Film;
    if (film.id != null) {
      dbFilm = await this.filmsRepository.create({ kpId: film.id });
      dbFilm = await this.filmsRepository.save(dbFilm);
    } else {
      throw new NotFoundException('Film not found');
    }

    let rating = await this.ratingsRepository.findOne({
      where: { owner: { id: user.id }, film: { kpId: film.id } },
    });

    if (!rating) {
      rating = this.ratingsRepository.create({
        rating: dto.rating,
        owner: user,
        film: {
          id: dbFilm.id,
        },
      });
    } else {
      rating.rating = dto.rating;
    }

    await this.ratingsRepository.save(rating);
  }

  async getComments(filmId: number, offset: number, limit: number) {
    if (limit > 50) limit = 50;

    const comments = await this.commentsRepository.find({
      where: { film: { kpId: filmId } },
      skip: offset,
      take: limit,
      relations: ['owner'],
    });

    const parentComments = comments.filter((comment) => !comment.commentId);
    const commentsWithSubComments = [];

    for (const comment of parentComments) {
      const subCommentsCount = await this.commentsRepository.count({
        where: { commentId: comment.id },
      });

      const ownerWithoutPassword = { ...comment.owner };
      delete ownerWithoutPassword.password;
      delete ownerWithoutPassword.hashedRt;
      delete ownerWithoutPassword.watchList;
      delete ownerWithoutPassword.lastActive;

      const commentWithSubComments = {
        comment: { ...comment, owner: ownerWithoutPassword },
        subCommentsCount: subCommentsCount,
      };

      commentsWithSubComments.push(commentWithSubComments);
    }

    if (commentsWithSubComments.length === 0) {
      throw new NotFoundException('No comments found');
    }

    return commentsWithSubComments;
  }

  // async getAllComments(filmId: string) {
  //   const comments = await this.commentsRepository.find({
  //     where: { film: { uuid: filmId } },
  //   });

  //   const commentsWithSubComments = [];

  //   for (const comment of comments) {
  //     if (!comment.commentId) {
  //       const subComments = await this.commentsRepository.find({
  //         where: { commentId: comment.id },
  //       });

  //       const commentWithSubComments = {
  //         comment: { ...comment, commentId: undefined },
  //         comments: subComments.map((subComment) => ({
  //           comment: subComment,
  //           comments: [],
  //         })),
  //       };

  //       commentsWithSubComments.push(commentWithSubComments);
  //     }
  //   }

  //   return commentsWithSubComments;
  // }

  async getSubComments(parent_uuid: string, offset: number, limit: number) {
    if (limit > 50) limit = 50;

    const subComments = await this.commentsRepository.find({
      where: { commentId: parent_uuid },
      skip: offset,
      take: limit,
      relations: ['owner'],
    });

    if (subComments.length === 0) {
      throw new NotFoundException('No subcomments found');
    }

    const subCommentsWithUserInfo = subComments.map((subComment) => {
      const { owner, ...commentData } = subComment;

      const ownerWithoutSensitiveInfo = { ...owner };
      delete ownerWithoutSensitiveInfo.password;
      delete ownerWithoutSensitiveInfo.hashedRt;
      delete ownerWithoutSensitiveInfo.watchList;
      delete ownerWithoutSensitiveInfo.lastActive;
      return {
        ...commentData,
        owner: ownerWithoutSensitiveInfo,
      };
    });

    return subCommentsWithUserInfo;
  }

  async addComment(filmId: number, userId: string, dto: CreateCommentDto) {
    let comment: Comment;
    const film = await this.filmsRepository.findOneBy({ kpId: filmId });
    if (!dto.commentId) {
      comment = await this.commentsRepository.create({
        owner: { id: userId },
        film: film,
        text: dto.text,
      });
    } else {
      comment = await this.commentsRepository.create({
        owner: { id: userId },
        film: film,
        text: dto.text,
        commentId: dto.commentId,
      });
    }

    return await this.commentsRepository.save(comment);
  }
}
