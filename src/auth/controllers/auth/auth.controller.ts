import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthSignInDto, AuthSignUpDto } from 'src/auth/dto/auth.dto';
import { AuthService } from '../../services/auth/auth.service';
import { Tokens } from 'src/auth/types/tokens.type';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AtGuard } from 'src/auth/guards/at.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { RtGuard } from 'src/auth/guards/rt.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() dto: AuthSignUpDto): Promise<Tokens> {
    try {
      return await this.authService.signUp(dto);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY' || error.code == '23505') {
        throw new HttpException(
          'Username or email is already in use',
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }
    }
  }

  @Post('signin')
  @Public()
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() dto: AuthSignInDto): Promise<Tokens> {
    try {
      return await this.authService.signIn(dto);
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetUser("sub") id: number) {
    try {
      return await this.authService.logout(id);
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('refresh')
  @Public()
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  async refresh(@GetUser("sub") id:number, @GetUser("refreshToken") rt: string) {
    try {
      return await this.authService.refreshTokens(id, rt);
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
