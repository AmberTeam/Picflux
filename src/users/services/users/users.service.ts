import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SerializedUser, User } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { UserParams } from 'src/users/types/user.type';
import { encode } from 'src/utils/bcrypt';
import { plainToClass } from 'class-transformer';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async findById(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async updateRtHash(id: number, hash: string) {
    const user = await this.usersRepository.findOneBy({ id });
    user.hashedRt = hash;

    return await this.usersRepository.save(user);
  }

  async signUp(userParams: UserParams): Promise<SerializedUser> {
    const password = await encode(userParams.password);
    const user = await this.usersRepository.create({
      ...userParams,
      createdAt: new Date(),
      password: password,
    });
    return plainToClass(SerializedUser, this.usersRepository.save(user));
  }

  async logout(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    user.hashedRt = '';

    return plainToClass(SerializedUser, this.usersRepository.save(user));
  }

  async updateLastActive(id: number) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw new UnauthorizedException();

    user.lastActive = new Date();

    return plainToClass(SerializedUser, this.usersRepository.save(user));
  }

  async follow(userId: number, targetId: number) {
    const user = await this.usersRepository.findOneBy({ id: targetId });

    if (!user) throw new UnauthorizedException();

    user.followers.push(userId);
    await this.usersRepository.save(user);
  }
  //.filter(num => num !== 12);

  async unfollow(userId: number, targetId: number) {
    const user = await this.usersRepository.findOneBy({ id: targetId });

    if (!user) throw new UnauthorizedException();

    user.followers = user.followers.filter(num => num !== userId);
    await this.usersRepository.save(user);
  }
}
