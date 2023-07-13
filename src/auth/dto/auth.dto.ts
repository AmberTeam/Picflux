import { IsEmail, IsNotEmpty, IsString, Length, MaxLength } from "class-validator";

export class AuthSignUpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(4, 30)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    password: string;
}


export class AuthSignInDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    password: string;
}
