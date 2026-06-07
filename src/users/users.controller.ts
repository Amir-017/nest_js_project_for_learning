import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuardGuard } from './auth/guards/auth_guard/auth_guard.guard';
import { AuthorizationGuardGuard } from './auth/guards/authorization_guard/authorization_guard.guard';
import { Role } from './Decorectors/role/role.decorator';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  // version 1
  ////////////////////////////////////////////////////////////

  // Create new user (register)

  ////////////////////////////////////////////////////////////
  @Post()
  @ApiOperation({ summary: 'Create a new user (register)' })
  @ApiOkResponse({ type: CreateUserDto, description: 'User created successfully.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  ////////////////////////////////////////////////////////////
  
  // Get all users (Admin only)

  ////////////////////////////////////////////////////////////
  @Role('admin')
  @UseGuards(AuthGuardGuard, AuthorizationGuardGuard)
  @Get()
  @ApiOperation({ summary: 'Get all users (admin only)' })
  @ApiOkResponse({ type: [CreateUserDto], description: 'List of users retrieved successfully.' })
  findAll() {
    return this.usersService.findAll();
  }

  ////////////////////////////////////////////////////////////

  // Get logged in user details

  ////////////////////////////////////////////////////////////
  @Role('user')
  @ApiBearerAuth()
  @UseGuards(AuthGuardGuard, AuthorizationGuardGuard)
  @Get('userDetails')
  @ApiOperation({ summary: 'Get user details' })
  @ApiOkResponse({ type: CreateUserDto, description: 'User details retrieved successfully.' })
  findOne(@Req() { user }) {
    return this.usersService.findOne(user.id);
  }

  ////////////////////////////////////////////////////////////

  // Update logged in user profile

  ////////////////////////////////////////////////////////////

  @Role('user')
  @ApiBearerAuth()
  @UseGuards(AuthGuardGuard, AuthorizationGuardGuard)
  @Patch('editeProfile')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiOkResponse({ type: UpdateUserDto, description: 'User profile updated successfully.' })
  update(@Req() { user }, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user.id, updateUserDto);
  }

  ////////////////////////////////////////////////////////////

  // Delete logged in user profile

  ////////////////////////////////////////////////////////////
  @Role('user')
  @ApiBearerAuth()
  @UseGuards(AuthGuardGuard, AuthorizationGuardGuard)
  @Delete('deleteProfile')
  @ApiOperation({ summary: 'Delete user profile' })
  @ApiOkResponse({ type: CreateUserDto, description: 'User profile deleted successfully.' })
  remove(@Req() { user }) {
    return this.usersService.remove(user.id);
  }

////////////////////////////////////////////////////////////

  // Get logged in user information

////////////////////////////////////////////////////////////
  @Role('user')
  @ApiBearerAuth()
  @UseGuards(AuthGuardGuard, AuthorizationGuardGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get user information' })
  @ApiOkResponse({ type: CreateUserDto, description: 'User information retrieved successfully.' })
  infoUser(@Req() { user }) {
    return this.usersService.infoUser(user.id);
  }

  //version 2 commmmmmmming soon

}
