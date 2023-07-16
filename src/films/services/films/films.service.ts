import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import {
  Film,
  SerializedPaginationFilm,
} from 'src/typeorm/entities/film.entity';
import { Rating } from 'src/typeorm/entities/rating.entity';
import { Repository } from 'typeorm';
import { SerializedFilm } from '../../../typeorm/entities/film.entity';
import { CreateRatingDto } from 'src/films/dto/CreateRating.dto';
import { User } from 'src/typeorm/entities/user.entity';
import { Comment } from 'src/typeorm/entities/comment.entity';
import { CreateCommentDto } from 'src/films/dto/CreateComment.dto';
import { availablePlayers } from 'src/utils/available_players';
import { config } from 'dotenv';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film) private readonly filmsRepository: Repository<Film>,
    @InjectRepository(Rating)
    private readonly ratingsRepository: Repository<Rating>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  async getFilms(offset: number, limit: number) {
    if (limit > 50) limit = 50;
    const films = await this.filmsRepository.find({
      skip: offset,
      take: limit,
    });

    return films.map((film) =>
      plainToClass(SerializedPaginationFilm, {
        ...film,
        averageRating: this.getAverageRatingByFilmId(film.uuid),
      }),
    );
  }

  async getPlayers(uuid: string) {
    config();

    const film = await this.filmsRepository.findOne({
      where: { uuid: uuid },
    });
    const kpId = film.kpId;
    if (!film)
      throw new NotFoundException(`Couldn't fond film with id: ${uuid}`);

    let results = [];

    for (let i = 0; i < availablePlayers.length; i++) {
      console.log('mapped');
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
              availablePlayers[i].construct(kpId),
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
              availablePlayers[i].construct(kpId),
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
              availablePlayers[i].construct(kpId),
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

  async getComments(filmId: string, offset: number, limit: number) {
    if (limit > 50) limit = 50;

    const comments = await this.commentsRepository.find({
      where: { film: { uuid: filmId } },
      skip: offset,
      take: limit,
      relations: ['owner'],
    });

    const parentComments = comments.filter((comment) => !comment.commentId);
    const commentsWithSubComments = [];

    for (const comment of parentComments) {
      console.log(comment);
      const subCommentsCount = await this.commentsRepository.count({
        where: { commentId: comment.id },
      });

      console.log(comment.owner);
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

  async addComment(filmId: string, userId: string, dto: CreateCommentDto) {
    let comment: Comment;
    if (!dto.commentId) {
      comment = await this.commentsRepository.create({
        owner: { id: userId },
        film: { uuid: filmId },
        text: dto.text,
      });
    } else {
      comment = await this.commentsRepository.create({
        owner: { id: userId },
        film: { uuid: filmId },
        text: dto.text,
        commentId: dto.commentId,
      });
    }

    return await this.commentsRepository.save(comment);
  }
}
