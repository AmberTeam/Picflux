import { IsNotEmpty } from "class-validator";

export class CreateAlertDto {
    @IsNotEmpty()
    recipient: string;

    @IsNotEmpty()
    tag: string;
}