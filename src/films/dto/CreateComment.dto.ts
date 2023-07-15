import { IsNotEmpty, IsString, Length, MaxLength } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(1000)
    text: string;

    commentId: string;
}