import {
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

@Controller('api/films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get(':id')
  @Public()
  async getFilm(
    @Param('id', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ) {
    return this.filmsService.getFilm(uuid);
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
    dto.rating = parseInt(dto.rating.toString());
    return this.filmsService.rateFilm(filmId, dto, userId);
  }
}
