import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SerializedUser, User } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { UserParams } from 'src/users/types/user.type';
import { encode } from 'src/utils/bcrypt';
import { plainToClass } from 'class-transformer';
import { UpdateUserDto } from 'src/users/dto/UpdateUser.dto';
import { CreateAlertDto } from 'src/users/dto/CreateAlert.dto';
import { Alert } from 'src/typeorm/entities/alert.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Alert)
    private readonly alertsRepository: Repository<Alert>,
  ) {}

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async findById(id: string) {
    return await this.usersRepository.findOneBy({ id });
  }

  async getUserById(id: string) {
    return plainToClass(
      SerializedUser,
      await this.usersRepository.findOneBy({ id }),
    );
  }

  async updateRtHash(id: string, hash: string) {
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

  async logout(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    user.hashedRt = '';

    return plainToClass(SerializedUser, this.usersRepository.save(user));
  }

  async updateLastActive(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw new UnauthorizedException();

    user.lastActive = new Date();

    return plainToClass(SerializedUser, this.usersRepository.save(user));
  }

  async follow(userId: string, targetId: string) {
    const user = await this.usersRepository.findOneBy({ id: targetId });

    if (!user) throw new UnauthorizedException();

    user.followers.push(userId);
    await this.usersRepository.save(user);
  }
  //.filter(num => num !== 12);

  async unfollow(userId: string, targetId: string) {
    const user = await this.usersRepository.findOneBy({ id: targetId });

    if (!user) throw new UnauthorizedException();

    user.followers = user.followers.filter((num) => num !== userId);
    await this.usersRepository.save(user);
  }

  async updateUser(
    id: string,
    dto: UpdateUserDto,
    avatar: Express.Multer.File = null,
  ) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new UnauthorizedException();

    if (avatar) {
      user.avatar = avatar.path;
    }

    if (dto.biography) {
      user.biography = dto.biography;
    }

    if (dto.username) {
      user.username = dto.username;
    }

    return plainToClass(SerializedUser, await this.usersRepository.save(user));
  }

  async getAlerts(uuid: string) {
    const user = await this.usersRepository.findOne({
      where: { id: uuid },
      relations: { alerts: true },
    });

    return user.alerts;
  }

  async createAlert(id: string, dto: CreateAlertDto) {
    const alert = await this.alertsRepository.create(plainToClass(Alert, dto));

    const recipient = await this.usersRepository.findOne({
      where: { id: dto.recipient },
    });
    if (!recipient) {
      throw new NotFoundException(
        `Recipient with ID ${dto.recipient} not found`,
      );
    }

    return await this.alertsRepository.save(alert);
  }
}
