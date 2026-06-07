import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AuthGuardGuard } from 'src/users/auth/guards/auth_guard/auth_guard.guard';
import { AuthorizationGuardGuard } from 'src/users/auth/guards/authorization_guard/authorization_guard.guard';
import { Role } from 'src/users/Decorectors/role/role.decorator';
import { ApiBearerAuth, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

@ApiBearerAuth()
@UseGuards(AuthGuardGuard, AuthorizationGuardGuard)
@ApiTags('cart')
@Controller('cart')

export class CartController {
  constructor(private readonly cartService: CartService) { }

  ////////////////////////////////////////////////////////////

  // Create new cart item for logged in user

  ////////////////////////////////////////////////////////////

  @Role('user')
  @Post()
  @ApiOperation({ summary: 'Add products to cart' })
  @ApiOkResponse({ type: CreateCartDto, description: 'Products added to cart successfully.' })
  create(@Req() { user }, @Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto, user.id);
  }

  ////////////////////////////////////////////////////////////

  // Get all carts (Admin only)

  ////////////////////////////////////////////////////////////

  @Role('admin')
  @Get()
  @ApiOperation({ summary: 'Get all carts (Admin only)' })
  @ApiOkResponse({ type: [CreateCartDto], description: 'List of carts retrieved successfully.' })
  findAll(@Query('word') word: string) {
    return this.cartService.findAll(word);
  }

  ////////////////////////////////////////////////////////////

  // Get logged in user cart details

  ////////////////////////////////////////////////////////////

  @Role('user')
  @Get('cartDetails')
  @ApiOperation({ summary: 'Get user cart details' })
  @ApiOkResponse({ type: CreateCartDto, description: 'User cart details retrieved successfully.' })
  findOne(@Req() { user }) {
    return this.cartService.findOne(user.id);
  }

  ////////////////////////////////////////////////////////////

  // Update cart products or quantity

  ////////////////////////////////////////////////////////////

  @Role('user')
  @ApiOperation({ summary: 'Update cart products or quantity' })
  @ApiOkResponse({ type: UpdateCartDto, description: 'Cart updated successfully.' })
  @Patch('updateCart')
  update(@Req() { user }, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(user.id, updateCartDto);
  }

  ////////////////////////////////////////////////////////////

  // Remove specific product from cart

  ////////////////////////////////////////////////////////////

  @Role('user')
  @ApiOperation({ summary: 'Remove specific product from cart' })
  @ApiNoContentResponse({ description: 'Product removed from cart successfully.' })
  @ApiParam({ name: 'id', description: 'Product ID to remove from cart', example: '60c72b2f9b1d8e5a5c8f9e7d' })
  @Delete('removeCart/:id')
  remove(@Req() { user }, @Param('id') id: string) {
    return this.cartService.remove(user.id, id);
  } 

  ////////////////////////////////////////////////////////////

  // Remove all products from user cart

  ////////////////////////////////////////////////////////////

  @Role('user')
  @Delete('removeAllCart')
  @ApiOperation({ summary: 'Remove all products from user cart' })
  @ApiNoContentResponse({ description: 'All products removed from cart successfully.' })
  removeAll(@Req() { user }) {
    return this.cartService.removeAll(user.id);
  }

} 