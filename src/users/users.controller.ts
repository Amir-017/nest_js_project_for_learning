import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuardGuard } from './auth/guards/auth_guard/auth_guard.guard';
import { AuthorizationGuardGuard } from './auth/guards/authorization_guard/authorization_guard.guard';
import { Role } from './Decorectors/role/role.decorator';
import { get } from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  // version 1
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
@Role('admin')  
@UseGuards(AuthGuardGuard,AuthorizationGuardGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

 @Role('user')   
  @UseGuards(AuthGuardGuard,AuthorizationGuardGuard)
  @Get('userDetails')
  findOne(@Req() {user}) {
    return this.usersService.findOne(user.id);
  }

   @Role('user')
  @UseGuards(AuthGuardGuard,AuthorizationGuardGuard)
  @Patch('editeProfile')
  update(@Req() {user}, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user.id, updateUserDto);
  }

   @Role('user')
  @UseGuards(AuthGuardGuard,AuthorizationGuardGuard)
  @Delete('deleteProfile')
  remove(@Req() {user}) {
    return this.usersService.remove(user.id);
  }


   @Role('user')
  @UseGuards(AuthGuardGuard,AuthorizationGuardGuard)
  @Get('me')
  infoUser(@Req() {user}) {
    return this.usersService.infoUser(user.id);
  }

  //version 2 commmmmmmming soon
  
}
 