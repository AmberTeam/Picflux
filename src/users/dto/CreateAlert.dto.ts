import { IsNotEmpty, IsUUID } from 'class-validator';
import { User } from 'src/typeorm/entities/user.entity';

export class CreateAlertDto {
  @IsNotEmpty()
  @IsUUID()
  recipient: string;

  owner: User;

  @IsNotEmpty()
  tag: string;
}
