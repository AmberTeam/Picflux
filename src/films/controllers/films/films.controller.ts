import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FilmsService } from '../../services/films/films.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { GetFilmDto } from 'src/films/dto/GetFilm.dto';
import { IsUUID } from 'class-validator';
import { CreateRatingDto } from 'src/films/dto/CreateRating.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { CreateCommentDto } from '../../dto/CreateComment.dto';

@Controller('api/films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}


  @Get(":id/comments/:parent_id")
  @Public()
  async getSubComments(
    @Param('id', new ParseUUIDPipe({ version: '4' })) uuid: string,
    @Param('parent_id', new ParseUUIDPipe({ version: '4' })) parent_uuid: string,
  ) {
    return this.filmsService.getSubComments(parent_uuid);
  }

  @Get(':id/comments')
  @Public()
  async getComments(
    @Param('id', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ) {
    return this.filmsService.getComments(uuid);
  }

  @Post(':id/comments')
  async addComment(
    @Param('id', new ParseUUIDPipe({ version: '4' })) uuid: string,@GetUser("sub") userId: string, @Body() dto: CreateCommentDto
  ) {
    return this.filmsService.addComment(uuid, userId, dto);
  }

  /**
   *
   * @param dto rating: number
   * @returns error or nothing
   */
  @Post(':id/rate')
  async rateFilm(
    @Param('id', new ParseUUIDPipe({ version: '4' })) filmId: string,
    @Body() dto: CreateRatingDto,
    @GetUser('sub') userId: string,
  ) {
    if (dto.rating < 1 || dto.rating > 10)
      throw new BadRequestException('Rating must be between 1 and 10');

    dto.rating = parseInt(dto.rating.toString());
    return this.filmsService.rateFilm(filmId, dto, userId);
  }

  @Get(':id')
  @Public()
  async getFilm(
    @Param('id', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ) {
    return this.filmsService.getFilm(uuid);
  }
}
