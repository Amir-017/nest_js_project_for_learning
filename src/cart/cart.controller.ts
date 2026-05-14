import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AuthGuardGuard } from 'src/users/auth/guards/auth_guard/auth_guard.guard';
import { AuthorizationGuardGuard } from 'src/users/auth/guards/authorization_guard/authorization_guard.guard';
import { Role } from 'src/users/Decorectors/role/role.decorator';

@Controller('cart')
@Role('user')
@UseGuards(AuthGuardGuard,AuthorizationGuardGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Req() {user} ,@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto,user.id);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get('cartDetails')
  findOne(@Req() {user}) {
    return this.cartService.findOne(user.id);
  }

  @Patch('updateCart')
  update(@Req() {id}, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(id, updateCartDto);
  }

  @Delete('removeCart')
  remove(@Req() {id}) {
    return this.cartService.remove(id);
  }

    @Get('test')
  test(@Req() {id}) {
    return 'this.cartService.remove(id)';
  }
}
