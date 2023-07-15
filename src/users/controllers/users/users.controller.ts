import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  Query,
  Patch,
  UseInterceptors,
  UploadedFile,
  Get,
  BadRequestException,
  Param,
  Delete,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UpdateUserDto } from 'src/users/dto/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateAlertDto } from 'src/users/dto/CreateAlert.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('watch_list')
  async getWatchlist(@GetUser('sub') id: string) {
    return this.usersService.getWatchlist(id);
  }

  @Post('watch_list/:id')
  async addToWatchlist(@GetUser('sub') id: string, @Param("id") filmId: string) {
    return this.usersService.addToWatchlist(id, filmId);
  }

  @Delete('watch_list/:id')
  async removeFromWatchlist(@GetUser('sub') id: string, @Param("id") filmId: string) {
    return this.usersService.removeFromWatchlist(id, filmId);
  }


  @Get('alerts')
  async getAlerts(@GetUser('sub') id: string) {
    return await this.usersService.getAlerts(id);
  }

  @Post('alerts/create')
  async createAlert(@GetUser('sub') id: string, @Body() dto: CreateAlertDto) {
    if (dto.recipient === id || !dto.recipient)
      throw new BadRequestException(
        "Can't create alert with the same owner and the same recipient!",
      );

    dto.owner = await this.usersService.findById(id);

    return await this.usersService.createAlert(id, dto);
  }

  @Get(':id')
  @Public()
  async getUser(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Patch('last_active/update')
  @HttpCode(HttpStatus.OK)
  async updateLastActive(@GetUser('sub') id: string) {
    return this.usersService.updateLastActive(id);
  }

  @Post('follow')
  @HttpCode(HttpStatus.OK)
  async follow(
    @GetUser('sub') userId: string,
    @Query('target') targetId: string,
  ) {
    if (targetId == userId)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    return await this.usersService.follow(userId, targetId);
  }

  @Post('unfollow')
  @HttpCode(HttpStatus.OK)
  async unfollow(
    @GetUser('sub') userId: string,
    @Query('target') targetId: string,
  ) {
    if (targetId == userId)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    return await this.usersService.unfollow(userId, targetId);
  }

  @Post('update')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './statics/avatars',
        filename: (_, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @GetUser('sub') id: string,
    @Body() dto: UpdateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.usersService.updateUser(id, dto, avatar);
  }
}
