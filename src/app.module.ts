import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/user.entity';
import { config } from 'dotenv';
import { AtGuard } from './auth/guards/at.guard';
import { APP_GUARD } from '@nestjs/core';
import { FilmsModule } from './films/films.module';
import { Alert } from './typeorm/entities/alert.entity';

config();

@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "postgres",
    "host": process.env.POSTGRES_HOST,
    "port": parseInt(process.env.POSTGRES_PORT),
    "username": process.env.POSTGRES_USERNAME,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DATABASE,
    "entities": [User, Alert],
    synchronize: true
  }), UsersModule, AuthModule, FilmsModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard
    }
  ]
})
export class AppModule {}
