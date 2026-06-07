import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';

////////////////////////////////////////////////////////////

// Authentication controller for handling user login and Google OAuth

////////////////////////////////////////////////////////////
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  ////////////////////////////////////////////////////////////

  // User login with email and password

  ////////////////////////////////////////////////////////////
  @Post('login')
  Login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.Login(createAuthDto);
  }

  ////////////////////////////////////////////////////////////

  // Google OAuth login

  ////////////////////////////////////////////////////////////
 @UseGuards(AuthGuard('google'))
@Get('google')
googleLogin() {
  // redirect to google
}


  ////////////////////////////////////////////////////////////

  // Google OAuth callback

  ////////////////////////////////////////////////////////////
  @UseGuards(AuthGuard('google'))
@Get('google/callback')
googleCallback(@Req() req , @Res() res:Response) {

  return this.authService.googleLogin(req.user,res);
}
}
