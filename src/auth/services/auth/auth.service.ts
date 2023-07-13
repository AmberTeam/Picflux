import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants/jwt.constants';
import { AuthSignInDto, AuthSignUpDto } from 'src/auth/dto/auth.dto';
import { Tokens } from 'src/auth/types/tokens.type';
import { UsersService } from 'src/users/services/users/users.service';
import { compare, encode } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: AuthSignUpDto): Promise<Tokens> {
    const user = await this.usersService.signUp(dto);
    const tokens = this.getTokens(user.id, user.email, user.username);
    return tokens;
  }

  async signIn(dto: AuthSignInDto): Promise<Tokens> {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) throw new ForbiddenException();
    if (!compare(dto.password, user.password)) throw new ForbiddenException();

    const tokens = await this.getTokens(user.id, user.email, user.username);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(id: number) {
    const user = await this.usersService.findById(id);

    if (!user) throw new ForbiddenException();

    await this.usersService.logout(user.id);
  }

  async refreshTokens(id: number, rt: string) {
    const user = await this.usersService.findById(id);

    if (!user) throw new ForbiddenException();
    if (!compare(rt, user.hashedRt)) throw new ForbiddenException();

    const tokens = await this.getTokens(user.id, user.email, user.username);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async getTokens(
    id: number,
    email: string,
    username: string,
  ): Promise<Tokens> {
    const payload = {
      sub: id,
      email: email,
      username: username,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.atSecret,
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.rtSecret,
      expiresIn: '14d',
    });

    await this.updateRtHash(id, refreshToken);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRtHash(id: number, rt: string) {
    const hash = await encode(rt);

    await this.usersService.updateRtHash(id, hash);
  }
}
