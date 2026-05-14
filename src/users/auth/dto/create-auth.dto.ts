import { IsEmail, IsNotEmpty, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password!: string;
}
