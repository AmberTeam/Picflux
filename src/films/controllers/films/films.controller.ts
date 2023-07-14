import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { FilmsService } from '../../services/films/films.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { GetFilmDto } from 'src/films/dto/GetFilm.dto';
import { IsUUID } from 'class-validator';

@Controller('api/films')
export class FilmsController {
    constructor(private readonly filmsService: FilmsService){}

    @Get(":id")
    @Public()
    async getFilm(@Param('id', new ParseUUIDPipe({ version: '4' })) uuid: string) {
        return this.filmsService.getFilm(uuid);
    }
}
