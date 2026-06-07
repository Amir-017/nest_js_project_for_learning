import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MaxLength, MinLength } from 'class-validator';



export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',

}

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'Amir whdan',
  })
  @MinLength(3)
  @MaxLength(15)
  @IsNotEmpty()
  name!: string;


  @ApiProperty({
    description: 'The email of the user',
    example: 'amir.whdan@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;


  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(15)
  password?: string;

  @ApiProperty({
    description: 'The role of the user',
    example: 'user',
  })
  @IsEnum(UserRole)
  role: UserRole = UserRole.USER;
}
