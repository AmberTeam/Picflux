import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FilmsService } from '../../services/films/films.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreateRatingDto } from 'src/films/dto/CreateRating.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { CreateCommentDto } from '../../dto/CreateComment.dto';
import { SkipThrottle } from '@nestjs/throttler';
import { AtOptionalGuard } from 'src/auth/guards/at-optional.guard';
import { RequiredFields } from 'src/films/types/required.type';

@Controller('api/films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('search')
  @Public()
  async search(
    @Query('q') query: string,
    @Query('limit', new ParseIntPipe()) limit: number,
    @Query('offset', new ParseIntPipe()) offset: number,
  ) {
    return this.filmsService.search(query, offset, limit);
  }

  @Get(':id/players')
  @Public()
  async getPlayers(@Param('id') id: number) {
    return this.filmsService.getPlayers(id);
  }

  @Get('comments/:parent_id')
  @SkipThrottle()
  @Public()
  async getSubComments(
    @Param('parent_id', new ParseUUIDPipe({ version: '4' }))
    parent_uuid: string,
    @Query('offset', new ParseIntPipe()) offset: number,
    @Query('limit', new ParseIntPipe()) limit: number,
  ) {
    return this.filmsService.getSubComments(parent_uuid, offset, limit);
  }

  @SkipThrottle()
  @Get(':id/comments')
  @Public()
  async getComments(
    @Param('id') id: number,
    @Query('offset', new ParseIntPipe()) offset: number,
    @Query('limit', new ParseIntPipe()) limit: number,
  ) {
    return this.filmsService.getComments(id, offset, limit);
  }

  @Post(':id/comments')
  async addComment(
    @Param('id') id: number,
    @GetUser('sub') userId: string,
    @Body() dto: CreateCommentDto,
  ) {
    return this.filmsService.addComment(id, userId, dto);
  }

  /**
   *
   * @param dto rating: number
   * @returns error or nothing
   */
  @Post(':id/rate')
  async rateFilm(
    @Param('id') id: number,
    @Body() dto: CreateRatingDto,
    @GetUser('sub') userId: string,
  ) {
    if (dto.rating < 1 || dto.rating > 10)
      throw new BadRequestException('Rating must be between 1 and 10');

    dto.rating = parseInt(dto.rating.toString());
    return this.filmsService.rateFilm(id, dto, userId);
  }

  @Get(':id')
  @Public()
  @UseGuards(AtOptionalGuard)
  async getFilm(
    @Param('id') id: number,
    @GetUser() user
  ) {
    return this.filmsService.getFilm(id, user);
  }

  @Get()
  @Public()
  async getFilms(
    @Query('offset', new ParseIntPipe()) offset: number,
    @Query('limit', new ParseIntPipe()) limit: number,
    @Query('required') required?: string,
  ) {
    let requiredFields: RequiredFields;
    if (required) {
      const fields = required.split(',');
      requiredFields = {
        poster: fields.includes('poster'),
        backdrop: fields.includes('bacxkdrop'),
      };
    }
    return this.filmsService.getFilms(offset, limit, requiredFields);
  }
}
