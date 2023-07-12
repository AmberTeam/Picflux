import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "postgres",
    "host": process.env.POSTGRES_HOST,
    "port": parseInt(process.env.POSTGRES_PORT),
    "username": process.env.POSTRES_USERNAME,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DATABASE,
    "entities": [User]
  }), UsersModule, AuthModule],
})
export class AppModule {}
