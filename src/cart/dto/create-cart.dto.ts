import { ApiProperty } from "@nestjs/swagger";

export class CreateCartDto {
    @ApiProperty({ example: '[{ productId: "60c72b2f9b1d8e5a5c8f9e7d", quantity: 2 }]', description: 'Product ID' })
    products!: { productId: string; quantity: number }[];
    userName!:string
}
    