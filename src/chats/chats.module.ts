import { Module } from '@nestjs/common';
import { ChatsService } from './services/chats/chats.service';
import { ChatsController } from './controllers/chats/chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/typeorm/entities/chat.entity';
import { User } from 'src/typeorm/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Chat])],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
