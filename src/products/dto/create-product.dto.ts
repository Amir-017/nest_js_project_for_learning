import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Max, MaxLength, MinLength } from "class-validator";

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product', example: 'Laptop' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
    name!: string;

      @ApiProperty({ description: 'The description of the product', example: 'A high-performance laptop' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
    description!: string;

    @ApiProperty({ description: 'The price of the product', example: 999.99 })
    @IsNotEmpty()
    @MinLength(1)
    @Max(10000)
    price!: number;

    @ApiProperty({ description: 'The name of the user who created the product', example: 'UserId Here' })
    userName!: string;
}
