import { IsInt, IsNotEmpty, IsNumberString, IsUUID, Length, Max, Min, isInt } from "class-validator";

export class CreateRatingDto {
    @IsNotEmpty()
    @IsNumberString()
    rating: number;
}