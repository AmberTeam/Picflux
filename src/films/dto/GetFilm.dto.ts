import { IsNotEmpty, IsUUID } from "class-validator";

export class GetFilmDto {
    @IsNotEmpty()
    @IsUUID()
    uuid: string
}