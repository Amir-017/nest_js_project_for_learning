import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AuthGuardGuard } from 'src/users/auth/guards/auth_guard/auth_guard.guard';
import { AuthorizationGuardGuard } from 'src/users/auth/guards/authorization_guard/authorization_guard.guard';
import { Role } from 'src/users/Decorectors/role/role.decorator';

@Controller('cart')

export class CartController {
  constructor(private readonly cartService: CartService) { }

  ////////////////////////////////////////////////////////////

  // Create new cart item for logged in user

  ////////////////////////////////////////////////////////////

  @Role('user')
  @UseGuards(AuthGuardGuard, AuthorizationGuardGuard)
  @Post()
  create(@Req() { user }, @Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto, user.id);
  }

  ////////////////////////////////////////////////////////////

  // Get all carts (Admin only)

  ////////////////////////////////////////////////////////////

  @Role('admin')
  @UseGuards(AuthGuardGuard, AuthorizationGuardGuard)
  @Get()
  findAll(@Query('word') word: string) {
    return this.cartService.findAll(word);
  }

  ////////////////////////////////////////////////////////////

  // Get logged in user cart details

  ////////////////////////////////////////////////////////////

  @Role('user')
  @UseGuards(AuthGuardGuard, AuthorizationGuardGuard)
  @Get('cartDetails')
  findOne(@Req() { user }) {
    return this.cartService.findOne(user.id);
  }

  ////////////////////////////////////////////////////////////

  // Update cart products or quantity

  ////////////////////////////////////////////////////////////

  @Role('user')
  @UseGuards(AuthGuardGuard, AuthorizationGuardGuard)
  @Patch('updateCart')
  update(@Req() { user }, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(user.id, updateCartDto);
  }

  ////////////////////////////////////////////////////////////

  // Remove specific product from cart

  ////////////////////////////////////////////////////////////

  @Role('user')
  @UseGuards(AuthGuardGuard, AuthorizationGuardGuard)
  @Delete('removeCart/:id')
  remove(@Req() { user }, @Param('id') id: string) {
    return this.cartService.remove(user.id, id);
  }

  ////////////////////////////////////////////////////////////

  // Remove all products from user cart

  ////////////////////////////////////////////////////////////

  @Role('user')
  @UseGuards(AuthGuardGuard, AuthorizationGuardGuard)
  @Delete('removeAllCart')
  removeAll(@Req() { user }) {
    return this.cartService.removeAll(user.id);
  }

}