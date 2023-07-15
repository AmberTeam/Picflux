import { IsInt, IsNotEmpty, IsNumberString, IsUUID, isInt } from "class-validator";

export class CreateRatingDto {
    @IsNotEmpty()
    @IsNumberString()
    rating: number;
}