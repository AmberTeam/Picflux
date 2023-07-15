import { Controller, Get } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { ChatsService } from 'src/chats/services/chats/chats.service';

@Controller('api/chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get("/inbox")
  async getInbox(@GetUser("sub") uuid: string) {
  }
}
