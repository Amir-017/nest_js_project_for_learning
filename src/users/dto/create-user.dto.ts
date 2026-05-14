import { IsEmail, IsEnum, IsNotEmpty, MaxLength, MinLength } from 'class-validator';



export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  
}

export class CreateUserDto {
  @MinLength(3)
  @MaxLength(15)
  @IsNotEmpty()
  name!: string;

  
  @IsEmail()
  email!: string;

  @MinLength(6)
  @MaxLength(15)
  password!: string;
   
  @IsEnum(UserRole)
    role: UserRole = UserRole.USER;
}
