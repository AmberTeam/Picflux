import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { UsersController } from './controllers/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { Alert } from 'src/typeorm/entities/alert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Alert])],
  providers: [UsersService],
  controllers: [UsersController,],
  exports: [UsersService]
})
export class UsersModule {}
