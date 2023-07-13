import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
  HttpException,
  Query,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('last_active/update')
  @HttpCode(HttpStatus.OK)
  async updateLastActive(@GetUser('sub') id: number) {
    return this.usersService.updateLastActive(id);
  }

  @Post('follow')
  @HttpCode(HttpStatus.OK)
  async follow(
    @GetUser('sub') userId: number,
    @Query('target') targetId: number,
  ) {
    if (targetId == userId)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    return await this.usersService.follow(userId, targetId);
  }

  @Post('unfollow')
  @HttpCode(HttpStatus.OK)
  async unfollow(
    @GetUser('sub') userId: number,
    @Query('target') targetId: number,
  ) {
    if (targetId == userId)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    return await this.usersService.unfollow(userId, targetId);
  }
}
