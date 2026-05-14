import { IsNotEmpty, Max, MaxLength, MinLength } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
    name!: string;

      @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
    description!: string;

    @IsNotEmpty()
    @MinLength(1)
    @Max(10000)
    price!: number;

    userName!: string;
}
