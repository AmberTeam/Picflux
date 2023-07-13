import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  Query,
  Patch,
  Req,
  UseInterceptors,
  UploadedFile,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UpdateUserDto } from 'src/users/dto/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateAlertDto } from 'src/users/dto/CreateAlert.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

  @Post('avatar')
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
  async updateAvatars(
    @GetUser('sub') id: string,
    @Body() dto: UpdateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.usersService.updateUser(id, dto, avatar);
  }

  @Get('alerts')
  async getAlerts(@GetUser('sub') id: string) {
    return await this.usersService.getAlerts(id);
  }

  @Post('alerts')
  async createAlert(@GetUser('sub') id: string, @Body() dto: CreateAlertDto) {
    if (dto.recipient === id || !dto.recipient) throw new BadRequestException();

    return await this.usersService.createAlert(id, dto);
  }
}
