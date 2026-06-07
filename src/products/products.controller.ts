import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Role } from 'src/users/Decorectors/role/role.decorator';
import { AuthGuardGuard } from 'src/users/auth/guards/auth_guard/auth_guard.guard';
import { AuthorizationGuardGuard } from 'src/users/auth/guards/authorization_guard/authorization_guard.guard';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }
 ////////////////////////////////////////////////////////////

 // Create a new product (admin only)

 ////////////////////////////////////////////////////////////
 
  @Role('admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuardGuard, AuthorizationGuardGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new product (admin only)' })
  @ApiOkResponse({ type: CreateProductDto, description: 'Product created successfully.' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  ////////////////////////////////////////////////////////////

  // Retrieve all products

  ////////////////////////////////////////////////////////////
  @Get()
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiOkResponse({ type: [CreateProductDto], description: 'List of all products.' })
  findAll() {
    return this.productsService.findAll();
  }

  ////////////////////////////////////////////////////////////

  // Retrieve a product by ID

  ////////////////////////////////////////////////////////////
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a product by ID' })
  @ApiOkResponse({ type: CreateProductDto, description: 'The requested product.' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

////////////////////////////////////////////////////////////

  // Update a product (admin only)

////////////////////////////////////////////////////////////
  @Role('admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuardGuard, AuthorizationGuardGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a product (admin only)' })
  @ApiOkResponse({ type: UpdateProductDto, description: 'Product updated successfully.' })
  @ApiParam({ name: 'id', description: 'The ID of the product to update', example: '60d0fe4f5311236168a109ca' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  ////////////////////////////////////////////////////////////

  // Delete a product (admin only)

  ////////////////////////////////////////////////////////////
  @Role('admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuardGuard, AuthorizationGuardGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product (admin only)' })
  @ApiOkResponse({ description: 'Product deleted successfully.' })
  @ApiParam({ name: 'id', description: 'The ID of the product to delete', example: '60d0fe4f5311236168a109ca' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
