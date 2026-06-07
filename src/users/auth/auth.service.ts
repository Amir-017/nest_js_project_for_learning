import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthProvider, User } from '../Schemas/user.scham';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<User>, private jwtService: JwtService) { }

  ////////////////////////////////////////////////////////////

  // User login with email and password

  ////////////////////////////////////////////////////////////
  async Login({ email, password }: CreateAuthDto) {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    if (!user.password) {
      throw new BadRequestException('This account uses Google login. Please login with Google.');
    }

    const isMatch = await bcrypt.compare(password, user.password ?? '');
    if (!isMatch) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload = { email: user.email, id: user._id, role: user.role };
    const token = this.jwtService.sign(payload, { secret: process.env.API_KEY, expiresIn: '1h' });

    return { accessToken: token };
  }

  ////////////////////////////////////////////////////////////

  // Google OAuth login

  ////////////////////////////////////////////////////////////
  async googleLogin(user: any, res: any) {
    try {
      if (!user || !user.email) {
        throw new BadRequestException('Google profile data is missing');
      }

      let dbUser = await this.userModel.findOne({ email: user.email });

      if (!dbUser) {
        dbUser = await this.userModel.create({
          email: user.email,
          name: user.name || 'Google User',
          googleId: user.googleId,
          authProvider: AuthProvider.GOOGLE,
          role: 'user',
        });
      } else if (!dbUser.googleId) {
        dbUser.googleId = user.googleId;
        await dbUser.save();
      }

      const token = this.jwtService.sign(
        {
          id: dbUser._id,
          email: dbUser.email,
          role: dbUser.role,
        },
        { secret: process.env.API_KEY, expiresIn: '1h' }
      );

      return res.redirect(
        `http://localhost:5173/auth/success?token=${token}`
      );
    } catch (error) {
      console.error('Google login error:', error);
      return res.redirect(`http://localhost:5173/auth/error?message=${error}`);
    }
  }
}
